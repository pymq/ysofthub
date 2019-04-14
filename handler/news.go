package handler

import (
	"github.com/labstack/echo/v4"
	"github.com/pymq/ysofthub/model"
	"github.com/pymq/ysofthub/utils"
	"log"
	"net/http"
	"strconv"
)

func (h *Handler) GetNewsByProjectId(c echo.Context) (err error) {
	projectId := c.Param("projectId")
	var results []model.News
	h.DB.Limit(30).Table("news").Select("*").Where("project_id = ?", projectId).Scan(&results)
	return c.JSON(http.StatusOK, results)
}

func (h *Handler) GetNewsByNewsId(c echo.Context) (err error) {
	//projectId := c.Param("projectId")
	newsId := c.Param("newsId")
	var news model.News
	result := h.DB.Find(&news, newsId)
	if result.RowsAffected == 0 {
		return c.JSON(http.StatusNotFound, utils.NotFound())
	}
	return c.JSON(http.StatusOK, news)
}

func (h *Handler) PostNews(c echo.Context) (err error) {
	userId := userIDFromToken(c)
	projectId, err := strconv.Atoi(c.Param("projectId"))
	if err != nil {
		log.Fatal(err)
	}

	// Check project author and project existence
	project := model.Project{AuthorID: uint(userId)}
	project.ID = uint(projectId)

	result := h.DB.Where(&project).First(&project)
	if result.RowsAffected == 0 {
		return c.JSON(http.StatusBadRequest, utils.ErrorMessage("Unknown projectId or access denied"))
	}

	// Read form fields
	title := c.FormValue("title")
	content := c.FormValue("content")

	// Save to database
	news := model.News{
		Title: title, ProjectID: uint(projectId), Content: content,
	}
	h.DB.Create(&news)

	return c.JSON(http.StatusCreated, news) // TODO return value
}
