import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './tasksDto/createTask.dto';
import { FilterTaskDto } from './tasksDto/searchTaskDto';

@Injectable()
export class TasksService {
  private allTask: Task[] = [];

  getAllTask() {
    return this.allTask;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.allTask.push(task);
    return task;
  }

  getTaskById(id: string): Task {
    const task = this.allTask.find((taskId) => taskId.id === id);
    if (!task) {
      throw new NotFoundException(`task with id ${id} not found`);
    }
    return task;
  }
  delteTaskById(id: string): Task[] {
    this.allTask = this.allTask.filter((taskId) => taskId.id !== id);
    return this.allTask;
  }

  updateTaskById(id: string, status: TaskStatus): Task[] {
    const task = this.getTaskById(id);
    console.log(task);
    task.status = status;
    return this.allTask;
  }

  getTaskByFilter(filterBy: FilterTaskDto): Task[] {
    const { status, search } = filterBy;
    let tasks = this.getAllTask();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }
    return tasks;
  }
}
