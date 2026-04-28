package main

import (
	"log"
	"os"

	"hotelpintar-backend/database"
	"hotelpintar-backend/handlers"
	"hotelpintar-backend/models"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Load .env file if exists
	_ = godotenv.Load("../.env") // Load from root dir

	// Connect to Database
	database.ConnectDB()

	// Auto Migrate models
	database.DB.AutoMigrate(
		&models.User{},
		&models.Booking{},
		&models.OTAIntegration{},
	)

	// Setup Gin router
	r := gin.Default()

	// Setup CORS (allow all for development)
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowHeaders = []string{"Origin", "Content-Length", "Content-Type", "Authorization"}
	r.Use(cors.New(config))

	// Routes
	api := r.Group("/api")
	{
		// Dashboard Stats
		api.GET("/stats", handlers.GetStats)

		// OTA Config Endpoints
		api.GET("/ota-integrations", handlers.GetOTAIntegrations)
		api.POST("/ota-integrations/config", handlers.UpdateOTAConfig)

		// API v1
		v1 := api.Group("/v1")
		{
			// Users
			v1.GET("/users", handlers.GetUsers)
			v1.POST("/users", handlers.CreateUser)
			v1.PUT("/users/:id", handlers.UpdateUser)
			v1.DELETE("/users/:id", handlers.DeleteUser)
			v1.PUT("/users/:id/status", handlers.UpdateUserStatus)

			// Bookings
			v1.GET("/bookings", handlers.GetBookings)
			v1.POST("/bookings", handlers.CreateBooking)
			v1.PUT("/bookings/:id", handlers.UpdateBooking)
			v1.DELETE("/bookings/:id", handlers.DeleteBooking)
		}
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	
	log.Printf("Starting backend server on port %s...", port)
	r.Run(":" + port)
}
