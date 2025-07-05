package controllers

import (
	"context"
	"goCraft/app/models"
	"goCraft/config"
	"net/http"
	"time"
	"fmt"

	"github.com/labstack/echo/v4"
)

func HealthCheck(c echo.Context) error {
	err := config.MongoClient.Ping(context.Background(), nil)
	if err != nil {
		return c.JSON(http.StatusServiceUnavailable, map[string]string{"status": "unhealthy"})
	}
	return c.JSON(http.StatusOK, map[string]string{"status": "healthy"})
}

func GetAllUsers(c echo.Context) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	cursor, err := config.MongoDB.Collection("users").Find(ctx, map[string]interface{}{})
	if err != nil {
	 fmt.Println(err)

		return c.JSON(http.StatusInternalServerError, err)
	}
	defer cursor.Close(ctx)

	var users []models.User
	for cursor.Next(ctx) {
		var user models.User
		if err := cursor.Decode(&user); err != nil {
			return c.JSON(http.StatusInternalServerError, err)
		}
		users = append(users, user)
	}

	return c.JSON(http.StatusOK, users)
}
