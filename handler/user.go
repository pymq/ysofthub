package handler

import (
	"github.com/labstack/echo/v4"
	"github.com/pymq/video-dump/model"
	"log"
	"net/http"
)

func (h *Handler) Signup(c echo.Context) (err error) {
	username := c.FormValue("username")
	password := c.FormValue("password")
	email := c.FormValue("email")

	// Validate
	if len(email) < 5 || len(password) < 6 || len(username) < 4 {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: "invalid email, username or password"}
	}

	// Save user
	user := model.User{Email: email, Username: username}
	hash, err := user.HashPassword(password)
	if err != nil {
		log.Fatal("could not hash password", password)
	}
	user.Password = hash
	result := h.DB.Create(&user)
	if result.RowsAffected == 0 {
		return &echo.HTTPError{Code: http.StatusInternalServerError, Message: "Username or email already exists"}
	}

	// Generate encoded token
	token, err := user.CreateToken(h.Key)
	if err != nil {
		return err
	}
	user.Token = token
	return c.JSON(http.StatusCreated, user)
}

func (h *Handler) Login(c echo.Context) (err error) {
	username := c.FormValue("username")
	password := c.FormValue("password")
	//email := c.FormValue("email")

	// Find user
	var user model.User
	result := h.DB.Where(&model.User{Username: username}).First(&user)

	if result.RowsAffected == 0 {
		return &echo.HTTPError{Code: http.StatusUnauthorized, Message: "invalid username or password"}
	}
	if !user.CheckPassword(password) {
		return &echo.HTTPError{Code: http.StatusUnauthorized, Message: "invalid username or password"}
	}

	// Generate encoded token
	token, err := user.CreateToken(h.Key)
	if err != nil {
		return err
	}
	user.Token = token
	return c.JSON(http.StatusOK, user)
}