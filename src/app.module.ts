import { Module } from '@nestjs/common';
import { TaskprojectModule } from './taskproject/taskproject.module';
import { DiscountprojectModule } from './discountproject/discountproject.module';
import { AuthModule } from './auth/auth.module';
import { FirebaseServiceModule } from './firebase-service/firebase-service.module';

@Module({
  imports: [TaskprojectModule, DiscountprojectModule, AuthModule, FirebaseServiceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
