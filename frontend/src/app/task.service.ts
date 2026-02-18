import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id: number;
  title: string;
  done: boolean;
  created_at: string;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly apiUrl = '/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  createTask(title: string): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, { title });
  }

  markDone(id: number): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${id}/done`, {});
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
