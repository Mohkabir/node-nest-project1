import { TaskStatus } from '../tasks.model';
import { IsEnum, IsString, IsOptional } from 'class-validator';

export class FilterTaskDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsOptional()
  @IsString()
  search: string;
}
