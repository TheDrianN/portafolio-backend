import { Module } from '@nestjs/common';
import { TaskprojectModule } from './taskproject/taskproject.module';
import { DiscountprojectModule } from './discountproject/discountproject.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TaskprojectModule, DiscountprojectModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
