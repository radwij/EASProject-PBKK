package campaign

import (
	"time"

	"gorm.io/gorm"
)

type Campaign struct {
	ID               int `gorm:"primaryKey"`
	UserID           int
	Name             string
	ShortDescription string
	Description      string
	Perks            string
	BackerCount      int
	GoalAmount       int
	CurrentAmount    int
	Slug             string
	CreatedAt        time.Time
	UpdatedAt        time.Time
	DeletedAt        gorm.DeletedAt
	CampaignImages   []CampaignImage `gorm:"foreignKey:CampaignID;constraint:OnDelete:CASCADE;"`
}

type CampaignImage struct {
	ID         int `gorm:"primaryKey"`
	CampaignID int
	FileName   string
	IsPrimary  int
	CreatedAt  time.Time
	UpdatedAt  time.Time
	DeletedAt  gorm.DeletedAt
}
