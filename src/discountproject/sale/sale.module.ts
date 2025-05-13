import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports:[],
  controllers: [SaleController],
  providers: [PrismaService,SaleService],
})
export class SaleModule {}
