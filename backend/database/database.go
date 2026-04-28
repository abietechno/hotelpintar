package database

import (
	"log"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	dbType := os.Getenv("DB_TYPE") // "mysql" or "postgres"
	dsn := os.Getenv("DB_DSN")     // Connection string

	var err error

	// If no DB configured, use an in-memory SQLite (Requires cgo) or just panic
	// For simplicity, we just expect the user to set environment variables.
	if dbType == "" {
		log.Println("DB_TYPE is not set, skipping database connection...")
		return
	}

	if dbType == "postgres" {
		DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	} else if dbType == "mysql" {
		DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	} else {
		log.Fatalf("Unsupported DB_TYPE: %s", dbType)
	}

	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	log.Println("Connected to database successfully")
}
