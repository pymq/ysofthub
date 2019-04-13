package model

type Issue struct {
	Model
	Title       string  `gorm:"not null" json:"title"`
	Description string  `gorm:"not null" json:"description"`
	UserID      uint    `json:"user_id"`
	//Status      string  `gorm:"not null" json:"status"` // TODO enum
	Project     Project `json:"-" gorm:"foreignkey:ProjectID"`
	ProjectID   uint    `json:"project_id"`
}
