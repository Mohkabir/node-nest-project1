import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './tasksDto/createTask.dto';
import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';
import { FilterTaskDto } from './tasksDto/searchTaskDto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTask(@Query() filterBy: FilterTaskDto): Task[] {
    console.log(
      Object.values.length,
      filterBy,
      Object.values,
      'Object.values.length',
    );
    if (Object.values.length) {
      return this.tasksService.getTaskByFilter(filterBy);
    } else {
      return this.tasksService.getAllTask();
    }
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  delteTaskById(@Param('id') id: string): Task[] {
    return this.tasksService.delteTaskById(id);
  }

  @Patch('/:id/status')
  updateTaskById(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task[] {
    return this.tasksService.updateTaskById(id, status);
  }
}
