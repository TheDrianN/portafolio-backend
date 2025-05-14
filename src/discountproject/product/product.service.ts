import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma:PrismaService) {}
  
  async create(createProductDto: CreateProductDto) {
    try {

      const product = await this.prisma.product.create({
        data:createProductDto
      });

      return {
        status: 'success',
        message: 'Producto creado exitosamente',
        data: product,
        errors: null,
        code: HttpStatus.CREATED,
      }
      
    } catch (error) {
      throw new HttpException (
        {
          status:'error',
          message:'Error Al crear producto',
          data: null,
          error:{},
          code: HttpStatus.BAD_REQUEST
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    try {
      const listProducts = await this.prisma.product.findMany();

      return {
        status: 'success',
        message: 'Productos listados correctamente',
        data: listProducts,
        errors: null,
        code: HttpStatus.OK,
      }
      
    } catch (error) {
      throw new HttpException(
        {
          status: 'error',
          message: 'Error al listar los Productos',
          data: null,
          errors: {
            code: 'LIST_ERROR',
            details: error.message,
          },
          code: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  async findOne(id: number) {
    try {

      const product = await this.prisma.product.findUniqueOrThrow({
        where:{id},
      }) 

      return {
        status: 'success',
        message: 'Producto encontrado correctamente',
        data: product,
        errors: null,
        code: HttpStatus.OK,
      };

    } catch (error) {
      
      throw new HttpException(
        {
          status: 'error',
          message: 'Producto no encontrado',
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

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const updated = await this.prisma.product.update({
        where:{id},
        data: updateProductDto
      });

      return {
        status: 'success',
        message: 'Producto actualizado correctamente',
        data: updated,
        errors: null,
        code: HttpStatus.OK,
      };
      
    } catch (error) {

      throw new HttpException(
        {
          status: 'error',
          message: 'Error al actualizar el Producto',
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
      const deleted = await this.prisma.product.update({
        where:{id},
        data:{
          deleted_at: new Date()
        }
      });

      return {
        status: 'success',
        message: 'Producto marcado como eliminado',
        data: deleted,
        errors: null,
        code: HttpStatus.OK,
      };
      
    } catch (error) {
      throw new HttpException(
        {
          status: 'error',
          message: 'Error al eliminar el Producto',
          data: null,
          errors: { code: 'DELETE_ERROR', details: error.message },
          code: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
