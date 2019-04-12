package model

import (
	"errors"
	"github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
	"time"
)

type User struct {
	Model
	Username string  `gorm:"unique_index;not null" json:"username"`
	Email    string  `gorm:"unique_index;not null" json:"email"`
	Password string  `gorm:"not null" json:"-"`
	Token    string  `gorm:"-" json:"token,omitempty"`
	Bio      string `json:"bio"`
	Image    *string `json:"-"`
}

func (u *User) HashPassword(plain string) (string, error) {
	if len(plain) == 0 {
		return "", errors.New("password should not be empty")
	}
	h, err := bcrypt.GenerateFromPassword([]byte(plain), bcrypt.DefaultCost)
	return string(h), err
}

func (u *User) CheckPassword(plain string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(plain))
	return err == nil
}

func (user *User) CreateToken(key string) (string, error) {
	//Create token
	token := jwt.New(jwt.SigningMethodHS256)

	// Set claims
	claims := token.Claims.(jwt.MapClaims)
	claims["id"] = user.ID
	claims["username"] = user.Username
	claims["email"] = user.Email
	claims["exp"] = time.Now().Add(time.Hour * 72).Unix()

	// Generate encoded token
	tokenStr, err := token.SignedString([]byte(key))
	return tokenStr, err
}
