package main

import (
	"goCraft/config"
	"goCraft/routes"
	"github.com/labstack/echo/v4"
	"github.com/joho/godotenv"
	"log"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	app := echo.New()

	// Connect DB
	config.InitDB()

	// Setup routes
	routes.RegisterAPIRoutes(app)

	app.Logger.Fatal(app.Start(":8080"))
}
