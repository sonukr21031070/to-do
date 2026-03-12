package com.todo.app.dto;

import com.todo.app.enums.Priority;
import com.todo.app.enums.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public class TaskRequest {

    @NotBlank(message = "Title is required")
    @Size(max = 200, message = "Title must not exceed 200 characters")
    private String title;

    private String description;
    private Priority priority = Priority.MEDIUM;
    private TaskStatus status = TaskStatus.TODO;
    private LocalDate dueDate;

    public TaskRequest() {}
    public TaskRequest(String title, String description, Priority priority, TaskStatus status, LocalDate dueDate) {
        this.title = title; this.description = description;
        this.priority = priority; this.status = status; this.dueDate = dueDate;
    }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Priority getPriority() { return priority; }
    public void setPriority(Priority priority) { this.priority = priority; }
    public TaskStatus getStatus() { return status; }
    public void setStatus(TaskStatus status) { this.status = status; }
    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }
}
