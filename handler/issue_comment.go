package handler

//import (
//	"github.com/labstack/echo/v4"
//	"github.com/pymq/gatox/model"
//	"log"
//	"net/http"
//	"strconv"
//	"time"
//)
//
//type CommentsResult struct {
//	Id        uint      `json:"id"`
//	CreatedAt time.Time `json:"created_at"`
//	Message   string    `json:"message"`
//	Username  string    `json:"username"`
//}
//
//func (h *Handler) GetCommentsByVideoId(c echo.Context) (err error) {
//	videoId := c.Param("id")
//	//var comments []model.IssueComment
//	//h.DB.Table("comments").Where("video_id = ?", videoId).Scan(&comments)
//	var comments []CommentsResult
//	h.DB.Table("comments").Select("comments.id, comments.created_at, comments.message, users.username").Order("comments.created_at desc").Where("comments.video_id = ?", videoId).Joins("left join users on users.id = comments.author_id").Scan(&comments)
//	return c.JSON(http.StatusOK, comments)
//}
//
//func (h *Handler) PostComment(c echo.Context) (err error) {
//	userId := userIDFromToken(c)
//	videoId, err := strconv.Atoi(c.Param("id"))
//	if err != nil {
//		log.Fatal(err)
//	}
//	message := c.FormValue("message")
//
//	comment := model.IssueComment{Message: message, AuthorID: uint(userId), VideoID: uint(videoId)}
//	h.DB.Create(&comment)
//	return c.String(http.StatusCreated, "") // TODO return value
//}
