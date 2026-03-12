package com.todo.app.service;

import com.todo.app.dto.TaskRequest;
import com.todo.app.dto.TaskResponse;
import com.todo.app.entity.Task;
import com.todo.app.entity.User;
import com.todo.app.enums.Priority;
import com.todo.app.enums.TaskStatus;
import com.todo.app.repository.TaskRepository;
import com.todo.app.repository.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    private User getAuthenticatedUser(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }

    public List<TaskResponse> getAllTasks(String username, String priority, String status) {
        User user = getAuthenticatedUser(username);

        List<Task> tasks;

        if (priority != null && status != null) {
            tasks = taskRepository.findByUserAndPriorityAndStatusOrderByCreatedAtDesc(
                    user, Priority.valueOf(priority.toUpperCase()), TaskStatus.valueOf(status.toUpperCase()));
        } else if (priority != null) {
            tasks = taskRepository.findByUserAndPriorityOrderByCreatedAtDesc(
                    user, Priority.valueOf(priority.toUpperCase()));
        } else if (status != null) {
            tasks = taskRepository.findByUserAndStatusOrderByCreatedAtDesc(
                    user, TaskStatus.valueOf(status.toUpperCase()));
        } else {
            tasks = taskRepository.findByUserOrderByCreatedAtDesc(user);
        }

        return tasks.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    public TaskResponse createTask(String username, TaskRequest request) {
        User user = getAuthenticatedUser(username);

        Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .priority(request.getPriority())
                .status(request.getStatus() != null ? request.getStatus() : TaskStatus.TODO)
                .dueDate(request.getDueDate())
                .user(user)
                .build();

        return mapToResponse(taskRepository.save(task));
    }

    public TaskResponse updateTask(String username, Long taskId, TaskRequest request) {
        User user = getAuthenticatedUser(username);
        Task task = getTaskForUser(taskId, user);

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setPriority(request.getPriority());
        task.setStatus(request.getStatus());
        task.setDueDate(request.getDueDate());

        return mapToResponse(taskRepository.save(task));
    }

    public TaskResponse updatePriority(String username, Long taskId, Priority priority) {
        User user = getAuthenticatedUser(username);
        Task task = getTaskForUser(taskId, user);
        task.setPriority(priority);
        return mapToResponse(taskRepository.save(task));
    }

    public TaskResponse updateStatus(String username, Long taskId, TaskStatus status) {
        User user = getAuthenticatedUser(username);
        Task task = getTaskForUser(taskId, user);
        task.setStatus(status);
        return mapToResponse(taskRepository.save(task));
    }

    public void deleteTask(String username, Long taskId) {
        User user = getAuthenticatedUser(username);
        Task task = getTaskForUser(taskId, user);
        taskRepository.delete(task);
    }

    private Task getTaskForUser(Long taskId, User user) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + taskId));
        if (!task.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Access denied: you don't own this task");
        }
        return task;
    }

    private TaskResponse mapToResponse(Task task) {
        return TaskResponse.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .priority(task.getPriority())
                .status(task.getStatus())
                .dueDate(task.getDueDate())
                .createdAt(task.getCreatedAt())
                .updatedAt(task.getUpdatedAt())
                .build();
    }
}
