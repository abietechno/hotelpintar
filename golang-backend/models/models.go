package models

import (
	"gorm.io/gorm"
	"time"
)

type User struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	Name      string         `json:"name"`
	Email     string         `gorm:"uniqueIndex" json:"email"`
	Role      string         `json:"role"`   // Admin, Manager, Staff
	Status    string         `json:"status"` // Active, Inactive
	Password  string         `json:"-"`      // hidden in json
	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"deletedAt"`
}

type Booking struct {
	ID        string    `gorm:"primaryKey" json:"id"` // e.g. BKG-2039
	Guest     string    `json:"guest"`
	Room      string    `json:"room"`
	Dates     string    `json:"dates"`
	Source    string    `json:"source"`
	Status    string    `json:"status"` // Pending, Confirmed, Checked In, Checked Out
	Amount    string    `json:"amount"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

type Room struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	Number    string    `json:"number"`
	Type      string    `json:"type"`   // Standard, Deluxe, Suite
	Status    string    `json:"status"` // AVAILABLE, OCCUPIED, MAINTENANCE
	Guest     string    `json:"guest"`
	FloorID   uint      `json:"floorId"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}
