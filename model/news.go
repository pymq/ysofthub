package model

type News struct {
	Model
	Title     string  `gorm:"not null" json:"title"`
	Content   string  `gorm:"not null" json:"content"`
	//Picture   []byte  `json:"-"` // TODO
	Project   Project `json:"-" gorm:"foreignkey:ProjectID"`
	ProjectID uint    `json:"project_id"`
}
