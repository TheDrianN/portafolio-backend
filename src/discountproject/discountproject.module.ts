import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { DiscountcodeModule } from './discountcode/discountcode.module';
import { SaleModule } from './sale/sale.module';

@Module({
  imports: [ProductModule, DiscountcodeModule, SaleModule]
})
export class DiscountprojectModule {}
