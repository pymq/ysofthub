package model

type Program struct {
	Model
	Version       string  `gorm:"not null" json:"version"`
	Description   string  `gorm:"not null" json:"description"`
	Documentation []byte  `json:"-"`
	File          []byte  `json:"-"`
	Project       Project `json:"project" gorm:"foreignkey:ProjectID"`
	ProjectID     uint    `json:"-"`
}
