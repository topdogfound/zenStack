package routes

import (
	"goCraft/app/controllers"
	"github.com/labstack/echo/v4"
)

func RegisterAPIRoutes(e *echo.Echo) {
	api := e.Group("/api")

	api.GET("/health", controllers.HealthCheck)
	api.GET("/users", controllers.GetAllUsers)
}
