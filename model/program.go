package model

type Program struct {
	Model
	Version           string  `gorm:"not null" json:"version"`
	Description       string  `gorm:"not null" json:"description"`
	Documentation     []byte  `json:"-"`
	DocumentationMime string  `gorm:"not null" json:"-"`
	DocumentationName string  `gorm:"not null" json:"-"`
	Program           []byte  `json:"-"`
	ProgramMime       string  `gorm:"not null" json:"-"`
	ProgramName       string  `gorm:"not null" json:"-"`
	Project           Project `json:"-" gorm:"foreignkey:ProjectID"`
	ProjectID         uint    `json:"project_id"`
}
