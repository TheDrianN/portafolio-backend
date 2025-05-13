import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaService } from 'src/prisma/prisma.service';
@Module({
  imports:[],
  controllers: [ProductController],
  providers: [PrismaService,ProductService],
})
export class ProductModule {}
