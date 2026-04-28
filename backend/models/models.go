package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	ID        string         `gorm:"primaryKey" json:"id"`
	Name      string         `json:"name"`
	Email     string         `gorm:"uniqueIndex" json:"email"`
	Role      string         `json:"role"`
	Status    string         `json:"status"`
	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

type Booking struct {
	ID        string         `gorm:"primaryKey" json:"id"`
	Guest     string         `json:"guest"`
	Phone     string         `json:"phone,omitempty"`
	Email     string         `json:"email,omitempty"`
	Address   string         `json:"address,omitempty"`
	RoomType  string         `json:"roomType,omitempty"`
	CheckIn   string         `json:"checkIn,omitempty"`
	CheckOut  string         `json:"checkOut,omitempty"`
	Room      string         `json:"room"`
	Dates     string         `json:"dates"`
	Source    string         `json:"source"`
	Status    string         `json:"status"`
	Amount    string         `json:"amount"`
	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

type OTAIntegration struct {
	ID        string         `gorm:"primaryKey" json:"id"`
	Name      string         `json:"name"`
	Active    bool           `json:"active"`
	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

type StatData struct {
	Name    string `json:"name"`
	Revenue int    `json:"revenue"`
}

type DashboardStats struct {
	OccupancyRate int        `json:"occupancyRate"`
	Revenue       int64      `json:"revenue"`
	Bookings      int        `json:"bookings"`
	ActiveRooms   int        `json:"activeRooms"`
	RevenueTrends []StatData `json:"revenueTrends"`
}
