package handlers

import (
	"fmt"
	"math/rand"
	"net/http"

	"hotelpintar-backend/database"
	"hotelpintar-backend/models"

	"github.com/gin-gonic/gin"
)

// --- GET DASHBOARD STATS ---
func GetStats(c *gin.Context) {
	// If DB is not connected, return mocked data
	if database.DB == nil {
		c.JSON(http.StatusOK, models.DashboardStats{
			OccupancyRate: 82,
			Revenue:       145000000,
			Bookings:      145,
			ActiveRooms:   120,
			RevenueTrends: []models.StatData{
				{Name: "Mon", Revenue: 15},
				{Name: "Tue", Revenue: 12},
				{Name: "Wed", Revenue: 18},
				{Name: "Thu", Revenue: 20},
				{Name: "Fri", Revenue: 32},
				{Name: "Sat", Revenue: 45},
				{Name: "Sun", Revenue: 35},
			},
		})
		return
	}

	// For real usage: Query DB here to get stats
	c.JSON(http.StatusOK, gin.H{"message": "Query real stats here"})
}

// --- GET OTA ---
func GetOTAIntegrations(c *gin.Context) {
	if database.DB == nil {
		c.JSON(http.StatusOK, gin.H{
			"integrations": []gin.H{
				{"id": "traveloka", "name": "Traveloka", "active": true},
				{"id": "agoda", "name": "Agoda", "active": true},
				{"id": "booking", "name": "Booking.com", "active": false},
			},
		})
		return
	}

	var otas []models.OTAIntegration
	database.DB.Find(&otas)
	c.JSON(http.StatusOK, gin.H{"integrations": otas})
}

func UpdateOTAConfig(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"success": true, "message": "Configuration updated successfully"})
}

// --- USERS ---
func GetUsers(c *gin.Context) {
	if database.DB == nil {
		c.JSON(http.StatusOK, gin.H{"message": "Database not configured"})
		return
	}
	var users []models.User
	database.DB.Find(&users)
	c.JSON(http.StatusOK, users)
}

func CreateUser(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	user.ID = fmt.Sprintf("USR-%d", rand.Intn(900)+1000)
	if database.DB != nil {
		database.DB.Create(&user)
	}
	c.JSON(http.StatusCreated, user)
}

func UpdateUser(c *gin.Context) {
	id := c.Param("id")
	var user models.User
	if database.DB != nil {
		if err := database.DB.Where("id = ?", id).First(&user).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
			return
		}
		if err := c.ShouldBindJSON(&user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		database.DB.Save(&user)
	}
	c.JSON(http.StatusOK, user)
}

func DeleteUser(c *gin.Context) {
	id := c.Param("id")
	if database.DB != nil {
		database.DB.Where("id = ?", id).Delete(&models.User{})
	}
	c.JSON(http.StatusOK, gin.H{"message": "User deleted"})
}

func UpdateUserStatus(c *gin.Context) {
	id := c.Param("id")
	var body struct {
		Status string `json:"status"`
	}
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if database.DB != nil {
		database.DB.Model(&models.User{}).Where("id = ?", id).Update("status", body.Status)
	}
	c.JSON(http.StatusOK, gin.H{"message": "User status updated"})
}

// --- BOOKINGS ---
func GetBookings(c *gin.Context) {
	if database.DB == nil {
		c.JSON(http.StatusOK, gin.H{"message": "Database not configured"})
		return
	}

	var bookings []models.Booking
	database.DB.Find(&bookings)
	c.JSON(http.StatusOK, bookings)
}

func CreateBooking(c *gin.Context) {
	var booking models.Booking
	if err := c.ShouldBindJSON(&booking); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	booking.ID = fmt.Sprintf("BKG-%d", rand.Intn(900)+2000)
	if database.DB != nil {
		database.DB.Create(&booking)
	}
	c.JSON(http.StatusCreated, booking)
}

func UpdateBooking(c *gin.Context) {
	id := c.Param("id")
	var booking models.Booking
	if database.DB != nil {
		if err := database.DB.Where("id = ?", id).First(&booking).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Booking not found"})
			return
		}
		if err := c.ShouldBindJSON(&booking); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		database.DB.Save(&booking)
	}
	c.JSON(http.StatusOK, booking)
}

func DeleteBooking(c *gin.Context) {
	id := c.Param("id")
	if database.DB != nil {
		database.DB.Where("id = ?", id).Delete(&models.Booking{})
	}
	c.JSON(http.StatusOK, gin.H{"message": "Booking deleted"})
}
