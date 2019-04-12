package model

type News struct {
	Model
	Title     string  `gorm:"not null" json:"title"`
	Content   string  `gorm:"not null" json:"content"`
	//Picture   []byte  `json:"-"`
	Project   Project `json:"project" gorm:"foreignkey:ProjectID"`
	ProjectID uint    `json:"-"`
}
