import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task, TaskService } from '../task.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  newTitle = '';
  error = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => (this.tasks = tasks),
      error: () => (this.error = 'Could not load tasks. Is the backend running?'),
    });
  }

  add(): void {
    const title = this.newTitle.trim();
    if (!title) return;
    this.taskService.createTask(title).subscribe({
      next: (task) => {
        this.tasks.push(task);
        this.newTitle = '';
      },
      error: () => (this.error = 'Failed to add task.'),
    });
  }

  markDone(task: Task): void {
    this.taskService.markDone(task.id).subscribe({
      next: (updated) => {
        const idx = this.tasks.findIndex((t) => t.id === updated.id);
        if (idx !== -1) this.tasks[idx] = updated;
      },
      error: () => (this.error = 'Failed to update task.'),
    });
  }

  delete(task: Task): void {
    this.taskService.deleteTask(task.id).subscribe({
      next: () => (this.tasks = this.tasks.filter((t) => t.id !== task.id)),
      error: () => (this.error = 'Failed to delete task.'),
    });
  }
}
