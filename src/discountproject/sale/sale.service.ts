import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SaleService {
  constructor(private readonly prisma:PrismaService){}
  
  async create(createSaleDto: CreateSaleDto) {
    try {
      const result = await this.prisma.$transaction(async (tx) => {
        const sale = await tx.sale.create({
          data: {
            total: createSaleDto.total,
            discount_code_id: createSaleDto.discount_code_id ?? null,
            discount_applied: createSaleDto.discount_applied ?? 0,
            final_total: createSaleDto.final_total,
          },
        });

        await tx.saleItem.createMany({
          data: createSaleDto.items.map((item) => ({
            sale_id: sale.id,
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.price,
            subtotal: item.subtotal,
          })),
        });

        const saleWithItems = await tx.sale.findUnique({
          where: { id: sale.id },
          include: { items: true },
        });

        return saleWithItems;
      });

      return {
        status: 'success',
        message: 'Venta creada exitosamente',
        data: result,
        errors: null,
        code: HttpStatus.CREATED,
      };
    } catch (error) {
      console.error('Error al crear la venta:', error);

      throw new HttpException(
        {
          status: 'error',
          message: 'Error al crear la venta',
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
      
      const listSale = await this.prisma.sale.findMany();

      return {
        status: 'success',
        message: 'Productos listados correctamente',
        data: listSale,
        errors: null,
        code: HttpStatus.OK,
      };
      
    } catch (error) {
      throw new HttpException(
        {
          status: 'error',
          message: 'Error al listar las ventas',
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

  findOne(id: number) {
    try {
      const sale = this.prisma.sale.findUniqueOrThrow({
        where:{id},
        include:{
          items: true
        }
      });

      return {
        status: 'success',
        message: 'Venta encontrado correctamente',
        data: sale,
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

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
