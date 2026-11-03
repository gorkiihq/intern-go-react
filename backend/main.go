package main

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"sync/atomic"

	"strconv"
)

type task struct {
	ID        string `json:"id"`
	Title     string `json:"title"`
	Completed bool   `json:"completed"`
}

var tasks = []task{
	{ID: "1", Title: "Create backend using Go", Completed: true},
	{ID: "2", Title: "Create frontend using React", Completed: false},
	{ID: "3", Title: "Integrate frontend and backend"},
}

func getTasks(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, tasks)
}

var idCounter uint64 = 3

func postTasks(c *gin.Context) {
	var newTask task

	if err := c.BindJSON(&newTask); err != nil {
		return
	}

	newTask.ID = strconv.FormatUint(atomic.AddUint64(&idCounter, 1), 10)

	tasks = append(tasks, newTask)

	c.IndentedJSON(http.StatusCreated, newTask)
}

func patchTasks(c *gin.Context) {
	id := c.Param("id")

	for i := range tasks {
		if tasks[i].ID == id {
			tasks[i].Completed = !tasks[i].Completed

			c.JSON(http.StatusOK, tasks[i])
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{"error": "Task not found."})
}

func main() {
	router := gin.Default()

	router.Use(cors.New(cors.DefaultConfig()))

	router.GET("/api/tasks", getTasks)
	router.POST("/api/tasks", postTasks)
	router.PATCH("/api/tasks/:id/toggle", patchTasks)

	router.Run("localhost:8080")
}
