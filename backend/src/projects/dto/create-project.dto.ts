import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ example: 'Website Redesign', description: 'The name of the project' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Complete redesign of company website', description: 'Project description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 1, description: 'The ID of the user who owns this project' })
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
