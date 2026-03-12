package com.todo.app.repository;

import com.todo.app.entity.Task;
import com.todo.app.entity.User;
import com.todo.app.enums.Priority;
import com.todo.app.enums.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUserOrderByCreatedAtDesc(User user);
    List<Task> findByUserAndPriorityOrderByCreatedAtDesc(User user, Priority priority);
    List<Task> findByUserAndStatusOrderByCreatedAtDesc(User user, TaskStatus status);
    List<Task> findByUserAndPriorityAndStatusOrderByCreatedAtDesc(User user, Priority priority, TaskStatus status);
}
