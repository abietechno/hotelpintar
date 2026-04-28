package main

import (
	"log"
	"hotel-backend/database"
	"hotel-backend/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	// Initialize Database Connection
	database.ConnectDb()

	app := fiber.New()

	// Enable CORS for frontend connection
	app.Use(cors.New())

	// Setup API routes
	routes.SetupRoutes(app)

	log.Fatal(app.Listen(":8080"))
}
