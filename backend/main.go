package main

import (
	"crowdfund_be/handler"
	"crowdfund_be/user"
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
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

	err = db.AutoMigrate(&user.User{})

	if err != nil {
		log.Fatal(err.Error())
	}

	userRepository := user.NewRepository(db)
	userService := user.NewService(userRepository)

	input := user.CheckEmailInput{
		Email: "postmann@email.com",
	}
	isAvailable, err := userService.IsEmailAvailable(input)
	if err != nil {
		fmt.Println("Something failed")
		fmt.Println(err.Error())
	}

	if isAvailable {
		fmt.Println("Email available")
	} else {
		fmt.Println("Email Unavailable")
	}

	userHandler := handler.NewUserHandler(userService)

	router := gin.Default()

	api := router.Group("api/v1")

	api.POST("/users", userHandler.RegisterUser)
	api.POST("/sessions", userHandler.Login)
	api.POST("/email_checkers", userHandler.CheckEmailAvailability)

	router.Run()
}
