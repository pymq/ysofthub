package model

type Project struct {
	Model
	Title       string `gorm:"not null" json:"title"`
	Goal        string `gorm:"not null" json:"goal"`
	Description string `gorm:"not null" json:"description"`
	Team        string `gorm:"not null" json:"team"`
	Platform    string `gorm:"not null" json:"platform"`
	Contacts    string `gorm:"not null" json:"contacts"`
	Logo        []byte `json:"-"`
	Author      User   `json:"author" gorm:"foreignkey:AuthorID"`
	AuthorID    uint   `json:"-"`
}
