import { PartialType } from '@nestjs/mapped-types';
import { CreateSaleDto } from './create-sale.dto';
import { IsInt, IsPositive } from 'class-validator';

export class UpdateSaleDto extends PartialType(CreateSaleDto) {
    @IsInt()
    @IsPositive()
    id:number
}
