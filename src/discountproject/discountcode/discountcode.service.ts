import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDiscountcodeDto } from './dto/create-discountcode.dto';
import { UpdateDiscountcodeDto } from './dto/update-discountcode.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DiscountcodeService {
  constructor(private readonly prisma: PrismaService) {}
  
  create(createDiscountcodeDto: CreateDiscountcodeDto) {
    try {

      const newDiscountCode = this.prisma.discountCode.create({
        data: createDiscountcodeDto
      });

      return {
        status: 'success',
        message: 'Código de descuento creado exitosamente',
        data: newDiscountCode,
        errors: null,
        code: HttpStatus.CREATED,
      };

    } catch (error) {

      throw new HttpException(
        {
          status: 'error',
          message: 'Error al crear el código de descuento',
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
      const listDiscountCode = await this.prisma.discountCode.findMany();

      return {
        status: 'success',
        message: 'Códigos de descuento listados correctamente',
        data: listDiscountCode,
        errors: null,
        code: HttpStatus.OK,
      };

    } catch (error) {

      throw new HttpException(
        {
          status: 'error',
          message: 'Error al listar los códigos de descuento',
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
      const discount  = await this.prisma.discountCode.findUniqueOrThrow({
        where:{id},
      });

      return {
        status: 'success',
        message: 'Código de descuento encontrado correctamente',
        data: discount,
        errors: null,
        code: HttpStatus.OK,
      };

    } catch (error) {
      console.log("ErrorDiscountCode: ",error);

      throw new HttpException(
        {
          status: 'error',
          message: 'Código de descuento no encontrado',
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

  update(id: number, updateDiscountcodeDto: UpdateDiscountcodeDto) {
    try {
      const updated  = this.prisma.discountCode.update({
        where:{id},
        data:updateDiscountcodeDto,
      });

      return {
        status: 'success',
        message: 'Código de descuento actualizado correctamente',
        data: updated,
        errors: null,
        code: HttpStatus.OK,
      };

    } catch (error) {

      throw new HttpException(
        {
          status: 'error',
          message: 'Error al actualizar el código de descuento',
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
    const deleted = await this.prisma.discountCode.update({
      where: { id },
      data: {
        deleted_at: new Date(), // o isDeleted: true
      },
    });

    return {
      status: 'success',
      message: 'Código de descuento marcado como eliminado',
      data: deleted,
      errors: null,
      code: HttpStatus.OK,
    };
  } catch (error) {
    throw new HttpException(
      {
        status: 'error',
        message: 'Error al eliminar el código de descuento',
        data: null,
        errors: { code: 'DELETE_ERROR', details: error.message },
        code: HttpStatus.BAD_REQUEST,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
}
