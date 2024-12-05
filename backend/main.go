package main

import (
	"crowdfund_be/auth"
	"crowdfund_be/campaign"
	"crowdfund_be/handler"
	"crowdfund_be/helper"
	"crowdfund_be/user"
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func main() {
	// refer https://github.com/go-sql-driver/mysql#dsn-data-source-name for details
	dsn := "root:mysqlpassword@tcp(127.0.0.1:3306)/crowdfundgo?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatal(err.Error())
	}

	err = db.AutoMigrate(&user.User{}, &campaign.Campaign{}, &campaign.CampaignImage{})

	if err != nil {
		log.Fatal(err.Error())
	}

	userRepository := user.NewRepository(db)
	campaignRepository := campaign.NewRepository(db)

	userService := user.NewService(userRepository)
	authService := auth.NewService()

	userHandler := handler.NewUserHandler(userService, authService)

	campaigns, _ := campaignRepository.FindByUserID(1)
	fmt.Println("------------------------------------")
	fmt.Println(len(campaigns))
	for _, campaign := range campaigns {
		fmt.Println(campaign.Name)
		fmt.Println(campaign.CampaignImages[0].FileName)
	}
	fmt.Println("------------------------------------")

	router := gin.Default()

	api := router.Group("api/v1")

	api.POST("/users", userHandler.RegisterUser)
	api.POST("/sessions", userHandler.Login)
	api.POST("/email_checkers", userHandler.CheckEmailAvailability)
	api.POST("/avatars", authMiddleware(authService, userService), userHandler.UploadAvatar)

	router.Run()
}

func authMiddleware(authService auth.Service, userService user.Service) gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if !strings.Contains(authHeader, "Bearer") {
			response := helper.APIResponse("Unauthorized", http.StatusUnauthorized, "error", "header not found")
			c.AbortWithStatusJSON(http.StatusUnauthorized, response)
			return
		}

		tokenString := ""
		tokenArray := strings.Split(authHeader, " ")
		if len(tokenArray) == 2 {
			tokenString = tokenArray[1]
		}

		fmt.Println("------------------------" + tokenString)

		token, err := authService.ValidateToken(tokenString)
		if err != nil {
			response := helper.APIResponse("Unauthorized", http.StatusUnauthorized, "error", "unable to get token")
			c.AbortWithStatusJSON(http.StatusUnauthorized, response)
			return
		}

		claim, ok := token.Claims.(jwt.MapClaims)
		if !ok || !token.Valid {
			response := helper.APIResponse("Unauthorized", http.StatusUnauthorized, "error", "invalid token")
			c.AbortWithStatusJSON(http.StatusUnauthorized, response)
			return
		}

		userID := int(claim["user_id"].(float64))

		user, err := userService.GetUserByID(userID)
		if err != nil {
			response := helper.APIResponse("Unauthorized", http.StatusUnauthorized, "error", "user id not found")
			c.AbortWithStatusJSON(http.StatusUnauthorized, response)
			return
		}

		c.Set("currentUser", user)
	}
}
