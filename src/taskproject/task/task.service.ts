import { HttpException, HttpStatus, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private readonly prisma:PrismaService) {}

  create(createTaskDto: CreateTaskDto) {
    try {
      this.prisma.task.create({
        data: createTaskDto
      });

      return {
        status:HttpStatus.CREATED,
        message:"Tarea creada exitosamente"
      }
    } catch (error) {
      throw  new  HttpException(
      {
       error: true,
       timeStamp: new Date(),
       message:'Error al procesar petición'
      },
      HttpStatus.BAD_REQUEST
    ) 
    }
  }

  findAll() {
    return `This action returns all task`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
