package handler

import (
	"bytes"
	"fmt"
	"github.com/labstack/echo/v4"
	"github.com/pymq/gatox/model"
	"github.com/pymq/gatox/utils"
	"io"
	"log"
	"net/http"
	"strconv"
)

func (h *Handler) GetProgramsByProjectId(c echo.Context) (err error) {
	projectId := c.Param("projectId")
	var results []model.Program
	h.DB.Table("programs").Select("version, description, project_id").Where("project_id = ?", projectId).Scan(&results)
	return c.JSON(http.StatusOK, results)
}

func (h *Handler) GetProgramDocumentation(c echo.Context) (err error) {
	id := c.Param("programId")
	var program model.Program
	result := h.DB.Select("documentation, documentation_mime, documentation_name").First(&program, id)
	if result.RowsAffected == 0 {
		return c.JSON(http.StatusNotFound, utils.NotFound())
	}
	reader := bytes.NewReader(program.Documentation)
	c.Response().Header().Set(echo.HeaderContentDisposition, fmt.Sprintf("%s; filename=%q", "attachment", program.DocumentationName))
	return c.Stream(http.StatusOK, program.DocumentationMime, reader)
}

func (h *Handler) GetProgramProgram(c echo.Context) (err error) {
	id := c.Param("programId")
	var program model.Program
	result := h.DB.Select("program, program_mime, program_name").First(&program, id)
	if result.RowsAffected == 0 {
		return c.JSON(http.StatusNotFound, utils.NotFound())
	}
	reader := bytes.NewReader(program.Program)
	c.Response().Header().Set(echo.HeaderContentDisposition, fmt.Sprintf("%s; filename=%q", "attachment", program.ProgramName))
	return c.Stream(http.StatusOK, program.ProgramMime, reader)
}

func (h *Handler) CreateProgram(c echo.Context) (err error) {
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
	version := c.FormValue("version")
	description := c.FormValue("description")

	// Multipart form

	// Documentation
	docFile, err := c.FormFile("documentation")
	if err != nil {
		return err
	}

	var documentation bytes.Buffer
	documentationMime := docFile.Header.Get("Content-Type")
	src, err := docFile.Open()
	if err != nil {
		return err
	}
	defer src.Close()

	// Download
	if _, err = io.Copy(&documentation, src); err != nil {
		return err
	}

	// File
	programFile, err := c.FormFile("program")
	if err != nil {
		return err
	}

	var programBuff bytes.Buffer
	programMime := programFile.Header.Get("Content-Type")
	programSrc, err := programFile.Open()
	if err != nil {
		return err
	}
	defer src.Close()

	// Download
	if _, err = io.Copy(&programBuff, programSrc); err != nil {
		return err
	}

	// Save to database
	program := model.Program{
		Version: version, ProjectID: uint(projectId), Description: description,
		Documentation: documentation.Bytes(), DocumentationMime: documentationMime, DocumentationName: docFile.Filename,
		Program: programBuff.Bytes(), ProgramMime: programMime, ProgramName: programFile.Filename,
	}
	h.DB.Create(&program)

	return c.JSON(http.StatusCreated, program) // TODO return value
}
