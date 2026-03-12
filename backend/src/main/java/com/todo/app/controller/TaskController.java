package com.todo.app.controller;

import com.todo.app.dto.TaskRequest;
import com.todo.app.dto.TaskResponse;
import com.todo.app.enums.Priority;
import com.todo.app.enums.TaskStatus;
import com.todo.app.service.TaskService;
import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<List<TaskResponse>> getAllTasks(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(required = false) String priority,
            @RequestParam(required = false) String status
    ) {
        return ResponseEntity.ok(taskService.getAllTasks(userDetails.getUsername(), priority, status));
    }

    @PostMapping
    public ResponseEntity<TaskResponse> createTask(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody TaskRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(taskService.createTask(userDetails.getUsername(), request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskResponse> updateTask(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id,
            @Valid @RequestBody TaskRequest request
    ) {
        return ResponseEntity.ok(taskService.updateTask(userDetails.getUsername(), id, request));
    }

    @PatchMapping("/{id}/priority")
    public ResponseEntity<TaskResponse> updatePriority(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id,
            @RequestBody Map<String, String> body
    ) {
        Priority priority = Priority.valueOf(body.get("priority").toUpperCase());
        return ResponseEntity.ok(taskService.updatePriority(userDetails.getUsername(), id, priority));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<TaskResponse> updateStatus(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id,
            @RequestBody Map<String, String> body
    ) {
        TaskStatus status = TaskStatus.valueOf(body.get("status").toUpperCase());
        return ResponseEntity.ok(taskService.updateStatus(userDetails.getUsername(), id, status));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteTask(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id
    ) {
        taskService.deleteTask(userDetails.getUsername(), id);
        return ResponseEntity.ok(Map.of("message", "Task deleted successfully"));
    }
}
