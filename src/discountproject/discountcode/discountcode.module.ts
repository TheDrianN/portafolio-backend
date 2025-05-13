import { Module } from '@nestjs/common';
import { DiscountcodeService } from './discountcode.service';
import { DiscountcodeController } from './discountcode.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [DiscountcodeController],
  providers: [PrismaService,DiscountcodeService],
})
export class DiscountcodeModule {}
