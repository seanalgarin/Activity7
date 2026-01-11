import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsNumber, IsEnum, IsDateString } from 'class-validator';
import { TaskStatus } from '../entities/task.entity';

export class CreateTaskDto {
  @ApiProperty({ example: 'Design homepage mockup', description: 'The title of the task' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Create wireframes and high-fidelity mockups', description: 'Task description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'pending', enum: TaskStatus, description: 'The status of the task', default: TaskStatus.PENDING })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiProperty({ example: '2024-12-31T23:59:59.000Z', description: 'The deadline for the task' })
  @IsNotEmpty()
  @IsDateString()
  deadline: string;

  @ApiProperty({ example: 1, description: 'The ID of the project this task belongs to' })
  @IsNotEmpty()
  @IsNumber()
  projectId: number;

  @ApiProperty({ example: 1, description: 'The ID of the user assigned to this task', required: false })
  @IsOptional()
  @IsNumber()
  assignedUserId?: number;
}
