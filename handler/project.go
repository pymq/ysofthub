package handler

import (
	"bytes"
	"github.com/labstack/echo/v4"
	"github.com/pymq/video-dump/model"
	"io"
	"net/http"
)

func (h *Handler) GetProjects(c echo.Context) (err error) {
	user := c.QueryParam("username")
	var results []model.Project
	if user == "" {
		h.DB.Limit(30).Table("projects").Select("*").Scan(&results)

	} else {
		// TODO
		//h.DB.Limit(30).Table("projects").Select("videos.id, videos.created_at, videos.title, videos.uuid, users.username as user").Where("user = ?", user).Joins("left join users on users.id = videos.author_id").Scan(&results)
	}
	return c.JSON(http.StatusOK, results)
}

func (h *Handler) GetProjectById(c echo.Context) (err error) {
	id := c.Param("id")
	var project model.Project
	h.DB.Find(&project, id)

	return c.JSON(http.StatusOK, project)
}

func (h *Handler) GetProjectLogo(c echo.Context) (err error) {
	id := c.Param("id")
	var project model.Project
	h.DB.First(&project, id)
	reader := bytes.NewReader(project.Logo)
	return c.Stream(http.StatusOK, "image/jpeg", reader)
}

func (h *Handler) CreateProject(c echo.Context) (err error) {
	userId := userIDFromToken(c)

	// Read form fields
	title := c.FormValue("title")
	description := c.FormValue("description")
	goal := c.FormValue("goal")
	team := c.FormValue("team")
	platform := c.FormValue("platform")
	contacts := c.FormValue("contacts")

	// Multipart form
	form, err := c.MultipartForm()
	if err != nil {
		return err
	}
	files := form.File["logo_file"]

	var logo bytes.Buffer
	// TODO limit to 1 file
	for _, file := range files {
		fileType := file.Header.Get("Content-Type")
		if fileType != "image/jpeg" {
			return &echo.HTTPError{Code: http.StatusNotAcceptable, Message: "Content-Type must be image/jpeg, not "+fileType}
		}
		src, err := file.Open()
		if err != nil {
			return err
		}
		defer src.Close()

		// Copy
		if _, err = io.Copy(&logo, src); err != nil {
			return err
		}
	}
	// Save to database
	project := model.Project{
		Description: description, Title: title, Goal: goal, Team: team,
		Logo: logo.Bytes(), Platform: platform, Contacts: contacts, AuthorID: uint(userId),
	}
	h.DB.Create(&project)

	return c.JSON(http.StatusCreated, project) // TODO return value
}
