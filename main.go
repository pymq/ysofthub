package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/pymq/gatox/db"
	"github.com/pymq/gatox/handler"
	"github.com/spf13/viper"
	"golang.org/x/crypto/acme/autocert"
	"log"
)

func readConfig() {
	viper.SetConfigFile("config.toml")
	viper.SetConfigType("toml")

	viper.SetDefault("port", ":443")
	viper.SetDefault("static_dir", "frontend/build/")
	viper.SetDefault("production", true)
	viper.SetDefault("verbose", false)

	err := viper.ReadInConfig()
	if err != nil {
		log.Fatalf("Fatal error while loading config file: %s \n", err)
	}
}

func main() {
	// Init

	readConfig()
	d := db.New(viper.GetBool("verbose"))
	defer d.Close()
	db.AutoMigrate(d) // REMOVE

	h := &handler.Handler{DB: d, Key: viper.GetString("secret_key")}
	e := echo.New()

	if viper.GetBool("production") {
		e.AutoTLSManager.HostPolicy = autocert.HostWhitelist(viper.GetStringSlice("hosts")...)
		e.AutoTLSManager.Cache = autocert.DirCache("/var/www/.cache")
	}

	// Middleware

	if viper.GetBool("production") {
		e.Pre(middleware.HTTPSRedirect())
	}
	if viper.GetBool("verbose") {
		e.Use(middleware.Logger())
	}
	e.Use(middleware.Recover())
	e.Use(middleware.GzipWithConfig(middleware.GzipConfig{
		Level: 5,
	}))
	//e.Pre(middleware.AddTrailingSlash())
	e.Use(middleware.StaticWithConfig(middleware.StaticConfig{
		Root:  viper.GetString("static_dir"),
		HTML5: true,
	}))

	// Routes

	// Auth
	e.POST("/api/signup", h.Signup)
	e.POST("/api/signin", h.Login)

	// Project
	e.GET("/api/projects/", h.GetProjects)
	e.POST("/api/projects/", h.CreateProject, middleware.JWT([]byte(viper.GetString("secret_key"))))
	e.GET("/api/projects/:id", h.GetProjectById)
	e.GET("/api/projects/:id/logo.png", h.GetProjectLogo)

	// News
	e.GET("/api/projects/:projectId/news/", h.GetNewsByProjectId)
	e.POST("/api/projects/:projectId/news/", h.PostNews, middleware.JWT([]byte(viper.GetString("secret_key"))))
	e.GET("/api/projects/:projectId/news/:newsId", h.GetNewsByNewsId)

	// Program
	e.GET("/api/projects/:projectId/programs/", h.GetProgramsByProjectId)
	e.POST("/api/projects/:projectId/programs/", h.CreateProgram, middleware.JWT([]byte(viper.GetString("secret_key"))))
	e.GET("/api/projects/:projectId/programs/:programId/documentation", h.GetProgramDocumentation)
	e.GET("/api/projects/:projectId/programs/:programId/program", h.GetProgramProgram)

	// Issue
	e.GET("/api/projects/:projectId/issues/", h.GetIssuesByProjectId)
	e.POST("/api/projects/:projectId/issues/", h.CreateIssue, middleware.JWT([]byte(viper.GetString("secret_key"))))
	e.GET("/api/projects/:projectId/issues/:issueId", h.GetIssueByIssueId)

	// Start
	if viper.GetBool("production") {
		go func() {
			e.Logger.Fatal(e.Start(":80"))
		}()
		e.Logger.Fatal(e.StartAutoTLS(viper.GetString("port")))
	} else {
		e.Logger.Fatal(e.Start(viper.GetString("port")))
	}
}
