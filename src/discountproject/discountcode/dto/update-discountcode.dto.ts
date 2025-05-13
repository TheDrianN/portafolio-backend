import { PartialType } from '@nestjs/mapped-types';
import { CreateDiscountcodeDto } from './create-discountcode.dto';
import { IsNumber, IsPositive } from 'class-validator';

export class UpdateDiscountcodeDto extends PartialType(CreateDiscountcodeDto) {
    @IsNumber()
    @IsPositive()
    id: number;
}
