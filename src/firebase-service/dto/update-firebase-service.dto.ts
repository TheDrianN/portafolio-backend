import { PartialType } from '@nestjs/mapped-types';
import { CreateFirebaseServiceDto } from './create-firebase-service.dto';

export class UpdateFirebaseServiceDto extends PartialType(CreateFirebaseServiceDto) {}
