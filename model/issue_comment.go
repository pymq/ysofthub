package model

type IssueComment struct {
	Model
	Message  string `gorm:"not null" json:"message"`
	Author   User   `json:"-" gorm:"foreignkey:AuthorID"`
	AuthorID uint   `json:"author_id"`
	IssueID  uint   `json:"issue_id"`
}


