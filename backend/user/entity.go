package user

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	ID             int `gorm:"primaryKey"`
	Name           string
	Occupation     string
	Email          string
	PasswordHash   string
	AvatarFileName string
	Role           string
	CreatedAt      time.Time
	UpdatedAt      time.Time
	DeletedAt      gorm.DeletedAt
}
