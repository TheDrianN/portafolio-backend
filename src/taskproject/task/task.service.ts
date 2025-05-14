import { HttpException, HttpStatus, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private readonly prisma:PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    try {
      const newTask = await this.prisma.task.create({
        data: createTaskDto
      });

      return {
        status: 'success',
        message: 'Tarea creado exitosamente',
        data: newTask,
        errors: null,
        code: HttpStatus.CREATED,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'error',
          message: 'Error al crear Tarea',
          data: null,
          errors: {
            code: 'CREATE_ERROR',
            details: error.message,
          },
          code: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

   async findAll() {
    try {
      const listTask = await this.prisma.task.findMany();

      return {
        status: 'success',
        message: 'Tareas listados correctamente',
        data: listTask,
        errors: null,
        code: HttpStatus.OK,
      };

    } catch (error) {

      throw new HttpException(
        {
          status: 'error',
          message: 'Error al listar las Tareas',
          data: null,
          errors: {
            code: 'LIST_ERROR',
            details: error.message,
          },
          code: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );

    }
  }

  async findOne(id: number) {
    try {
      const task = await this.prisma.task.findUniqueOrThrow({
        where:{id}
      });

      return {
        status: 'success',
        message: 'Tarea encontrado correctamente',
        data: task,
        errors: null,
        code: HttpStatus.OK,
      };
      
    } catch (error) {
      
      throw new HttpException(
        {
          status: 'error',
          message: 'Tarea no encontrado',
          data: null,
          errors: {
            code: 'NOT_FOUND',
            details: error.message,
          },
          code: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    try {
      const updated = await this.prisma.task.update({
        where:{id},
        data:updateTaskDto,
      });

      return {
        status: 'success',
        message: 'Tarea actualizado correctamente',
        data: updated,
        errors: null,
        code: HttpStatus.OK,
      };

    } catch (error) {

      throw new HttpException(
        {
          status: 'error',
          message: 'Error al actualizar la Tarea',
          data: null,
          errors: {
            code: 'UPDATE_ERROR',
            details: error.message,
          },
          code: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number) {
    try {
      const deleted = await this.prisma.task.update(
        {where:{id},
        data:{
          deleted_at: new Date()
        }
      }
      )

      return {
        status: 'success',
        message: 'Tarea marcado como eliminado',
        data: deleted,
        errors: null,
        code: HttpStatus.OK,
      };

    } catch (error) {

      throw new HttpException(
        {
          status: 'error',
          message: 'Error al eliminar la tarea',
          data: null,
          errors: { code: 'DELETE_ERROR', details: error.message },
          code: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );

    }
  }
}
