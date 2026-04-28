package routes

import (
	"hotel-backend/database"
	"hotel-backend/models"
	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	api := app.Group("/api/v1")

	// Users endpoints
	api.Get("/users", GetUsers)
	api.Post("/users", CreateUser)
	
	// Bookings endpoints
	api.Get("/bookings", GetBookings)
	api.Post("/bookings", CreateBooking)
	
	// Rooms endpoints
	api.Get("/rooms", GetRooms)
}

func GetUsers(c *fiber.Ctx) error {
	var users []models.User
	database.DB.Find(&users)
	return c.JSON(users)
}

func CreateUser(c *fiber.Ctx) error {
	user := new(models.User)
	if err := c.BodyParser(user); err != nil {
		return c.Status(400).JSON(err.Error())
	}
	database.DB.Create(&user)
	return c.Status(201).JSON(user)
}

func GetBookings(c *fiber.Ctx) error {
	var bookings []models.Booking
	database.DB.Find(&bookings)
	return c.JSON(bookings)
}

func CreateBooking(c *fiber.Ctx) error {
	booking := new(models.Booking)
	if err := c.BodyParser(booking); err != nil {
		return c.Status(400).JSON(err.Error())
	}
	database.DB.Create(&booking)
	return c.Status(201).JSON(booking)
}

func GetRooms(c *fiber.Ctx) error {
	var rooms []models.Room
	database.DB.Find(&rooms)
	return c.JSON(rooms)
}
