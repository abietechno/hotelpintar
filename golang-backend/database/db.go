package database

import (
	"log"
	"os"

	"hotel-backend/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"github.com/joho/godotenv"
)

var DB *gorm.DB

func ConnectDb() {
	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found, relying on environment variables")
	}

	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		// Default fallback based on your provided cockroach URL
		dsn = "postgresql://abie:eRXJe46qg5LpmA3qMwBugQ@remote-runner-25198.j77.aws-ap-southeast-3.cockroachlabs.cloud:26257/hotel-db?sslmode=verify-full"
	}

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database. \n", err)
	}

	log.Println("Connected Successfully to Database")
	db.AutoMigrate(&models.User{}, &models.Booking{}, &models.Room{})
	DB = db
}
