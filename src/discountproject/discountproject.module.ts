import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { DiscountcodeModule } from './discountcode/discountcode.module';
import { SaleModule } from './sale/sale.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [ProductModule, DiscountcodeModule, SaleModule, CategoryModule]
})
export class DiscountprojectModule {}
