package transaction

import (
	"crowdfund_be/campaign"
	"crowdfund_be/user"
	"time"

	"gorm.io/gorm"
)

type Transaction struct {
	ID         int `gorm:"primaryKey"`
	CampaignID int
	UserID     int
	Amount     int
	Status     string
	Code       string
	CreatedAt  time.Time
	UpdatedAt  time.Time
	DeletedAt  gorm.DeletedAt
	User       user.User
	Campaign   campaign.Campaign
}
