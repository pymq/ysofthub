package db

import (
	"fmt"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	"github.com/pymq/ysofthub/model"
)

func New(logMode bool) *gorm.DB {
	db, err := gorm.Open("sqlite3", "./prod.db")
	if err != nil {
		fmt.Println("storage err: ", err)
	}
	//db.DB().SetMaxIdleConns(3)
	db.LogMode(logMode)
	return db
}


// TODO err check
func AutoMigrate(db *gorm.DB) {
	db.AutoMigrate(
		&model.User{},
		&model.Project{},
		&model.News{},
		&model.Program{},
		&model.Issue{},
		&model.IssueComment{},
	)
}
