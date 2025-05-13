import { Module } from '@nestjs/common';
import { DiscountcodeService } from './discountcode.service';
import { DiscountcodeController } from './discountcode.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DiscountcodeController],
  providers: [DiscountcodeService],
})
export class DiscountcodeModule {}
