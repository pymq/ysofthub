package handler

import (
	"github.com/labstack/echo/v4"
	"github.com/pymq/gatox/model"
	"github.com/pymq/gatox/utils"
	"log"
	"net/http"
	"strconv"
)

func (h *Handler) GetIssuesByProjectId(c echo.Context) (err error) {
	projectId := c.Param("projectId")
	var results []model.Issue
	h.DB.Table("issues").Select("*").Where("project_id = ?", projectId).Scan(&results)
	return c.JSON(http.StatusOK, results)
}

func (h *Handler) GetIssueByIssueId(c echo.Context) (err error) {
	//projectId := c.Param("projectId")
	issueId := c.Param("issueId")
	var issue model.Issue
	result := h.DB.Find(&issue, issueId)
	if result.RowsAffected == 0 {
		return c.JSON(http.StatusNotFound, utils.NotFound())
	}
	return c.JSON(http.StatusOK, issue)
}

func (h *Handler) CreateIssue(c echo.Context) (err error) {
	userId := userIDFromToken(c)
	projectId, err := strconv.Atoi(c.Param("projectId"))
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

	// Read form fields
	title := c.FormValue("title")
	description := c.FormValue("description")

	// Save to database
	issue := model.Issue{
		Title: title, ProjectID: uint(projectId), Description: description, UserID: uint(userId),
	}
	h.DB.Create(&issue)

	return c.JSON(http.StatusCreated, issue) // TODO return value
}
