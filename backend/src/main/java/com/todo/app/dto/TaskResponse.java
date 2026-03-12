package com.todo.app.dto;

import com.todo.app.enums.Priority;
import com.todo.app.enums.TaskStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class TaskResponse {

    private Long id;
    private String title;
    private String description;
    private Priority priority;
    private TaskStatus status;
    private LocalDate dueDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public TaskResponse() {}
    public TaskResponse(Long id, String title, String description, Priority priority, TaskStatus status,
                        LocalDate dueDate, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id; this.title = title; this.description = description;
        this.priority = priority; this.status = status; this.dueDate = dueDate;
        this.createdAt = createdAt; this.updatedAt = updatedAt;
    }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
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
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private Long id;
        private String title, description;
        private Priority priority;
        private TaskStatus status;
        private LocalDate dueDate;
        private LocalDateTime createdAt, updatedAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder title(String title) { this.title = title; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder priority(Priority priority) { this.priority = priority; return this; }
        public Builder status(TaskStatus status) { this.status = status; return this; }
        public Builder dueDate(LocalDate dueDate) { this.dueDate = dueDate; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public Builder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }
        public TaskResponse build() {
            return new TaskResponse(id, title, description, priority, status, dueDate, createdAt, updatedAt);
        }
    }
}
