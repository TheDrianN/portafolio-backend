import { TaskPriority, TaskStatus } from "@prisma/client";
import { IsDateString, IsEnum, IsInt, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateTaskDto {
    @IsString()
    public title: string;
    
    @IsString()
    @IsOptional()
    public objective: string;
    
    @IsString()
    @IsOptional()
    public description: string;
    
    @IsString()
    @IsOptional()
    public notes: string;
    
    @IsDateString()
    @IsOptional()
    public deadline: Date;
    
    @IsEnum(TaskStatus)
    public status: TaskStatus;
    
    @IsEnum(TaskPriority)
    public priority:TaskPriority;
    
    @IsNumber()
    @Min(1)
    public userId: number;
}
