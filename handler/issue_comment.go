package handler

import (
	"github.com/labstack/echo/v4"
	"github.com/pymq/gatox/model"
	"github.com/pymq/gatox/utils"
	"log"
	"net/http"
	"strconv"
)

func (h *Handler) GetIssueCommentsByIssueId(c echo.Context) (err error) {
	projectId, err := strconv.Atoi(c.Param("projectId"))
	if err != nil {
		log.Fatal(err)
	}
	issueId, err := strconv.Atoi(c.Param("issueId"))
	if err != nil {
		log.Fatal(err)
	}

	// Check project existence
	project := model.Project{}
	project.ID = uint(projectId)

	result := h.DB.Where(&project).First(&project)
	if result.RowsAffected == 0 {
		return c.JSON(http.StatusBadRequest, utils.ErrorMessage("Unknown projectId"))
	}

	// Check issue existence
	issue := model.Issue{}
	issue.ID = uint(issueId)

	result = h.DB.Where(&issue).First(&issue)
	if result.RowsAffected == 0 {
		return c.JSON(http.StatusBadRequest, utils.ErrorMessage("Unknown issueId"))
	}

	var results []model.IssueComment
	h.DB.Table("issue_comments").Select("*").Where("issue_id = ?", issueId).Scan(&results)
	return c.JSON(http.StatusOK, results)
}


func (h *Handler) CreateIssueComment(c echo.Context) (err error) {
	userId := userIDFromToken(c)
	projectId, err := strconv.Atoi(c.Param("projectId"))
	if err != nil {
		log.Fatal(err)
	}
	issueId, err := strconv.Atoi(c.Param("issueId"))
	if err != nil {
		log.Fatal(err)
	}

	// Check project existence
	project := model.Project{}
	project.ID = uint(projectId)

	result := h.DB.Where(&project).First(&project)
	if result.RowsAffected == 0 {
		return c.JSON(http.StatusBadRequest, utils.ErrorMessage("Unknown projectId"))
	}

	// Check issue existence
	issue := model.Issue{}
	issue.ID = uint(issueId)

	result = h.DB.Where(&issue).First(&issue)
	if result.RowsAffected == 0 {
		return c.JSON(http.StatusBadRequest, utils.ErrorMessage("Unknown issueId"))
	}

	// Read form fields
	message := c.FormValue("message")

	// Save to database
	issueComment := model.IssueComment{
		Message: message, IssueID: uint(issueId), AuthorID: uint(userId),
	}
	h.DB.Create(&issueComment)

	return c.JSON(http.StatusCreated, issueComment) // TODO return value
}
