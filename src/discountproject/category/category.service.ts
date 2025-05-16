import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma:PrismaService){};

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = await this.prisma.category.create({
        data:createCategoryDto
      }); 

      return {
        status: 'success',
        message: 'Categoria creada exitosamente',
        data: category,
        errors: null,
        code: HttpStatus.CREATED,
      }

    } catch (error) {
      throw new HttpException(
        {
          status: 'error',
          message: 'Error al crear la categoria',
          data: null,
          errors: {
            code: 'CREATE_ERROR',
            details: error.message,
          },
          code: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST
      )
    }
  }

  async findAll() {
    try {
      const ListCategory = await this.prisma.category.findMany();

      return {
        status: 'success',
        message: 'Categorias listados correctamente',
        data: ListCategory,
        errors: null,
        code: HttpStatus.OK,
      };
      
    } catch (error) {
      throw new HttpException(
        {
          status: 'error',
          message: 'Error al listar las categorias',
          data: null,
          errors: {
            code: 'LIST_ERROR',
            details: error.message,
          },
          code: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST
      )
    }
  }

  async findOne(id: number) {
    try {
      const category = await this.prisma.category.findUniqueOrThrow({
        where:{id}
      });

      return {
        status: 'success',
        message: 'Categoria encontrado correctamente',
        data: category,
        errors: null,
        code: HttpStatus.OK,
      };
      
    } catch (error) {
      throw new HttpException(
        {
          status: 'error',
          message: 'Venta no encontrado',
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

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
   try {

    const updated = await this.prisma.category.update({
      where:{id},
      data: updateCategoryDto
    });

    return {
      status: 'success',
      message: 'Categoria actualizado correctamente',
      data: updated,
      errors: null,
      code: HttpStatus.OK,
    };
     
   } catch (error) {

    throw new HttpException(
      {
        status: 'error',
        message: 'Error al actualizar la categoria',
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
      const deleted = await this.prisma.category.update({
        where:{id},
        data:{ 
          updated_at: Date()
        },
      });

      return {
        status: 'success',
        message: 'Categoria marcado como eliminado',
        data: deleted,
        errors: null,
        code: HttpStatus.OK,
      };

    } catch (error) {

       throw new HttpException(
        {
          status: 'error',
          message: 'Error al eliminar la categoria',
          data: null,
          errors: { code: 'DELETE_ERROR', details: error.message },
          code: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
      
    }
  }
}
