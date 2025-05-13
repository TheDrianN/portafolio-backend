import { Type } from "class-transformer";
import { IsArray, IsInt, IsNumber, IsOptional, IsPositive, Min, ValidateNested } from "class-validator";

export class CreateSaleDto {
    @IsNumber({maxDecimalPlaces:2})
    total:number

    @IsOptional()
    @IsNumber()
    @IsPositive()
    discount_code_id:number;
    
    @IsOptional()
    @IsNumber({maxDecimalPlaces:2})
    discount_applied: number;

    @IsNumber({maxDecimalPlaces:2})
    final_total

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateSaleItemDto)
    items: CreateSaleItemDto[];
}

class CreateSaleItemDto {
    @IsInt()
    @IsPositive()
    product_id: number;
  
    @IsInt()
    @Min(1) // mínimo 1 unidad
    quantity: number;
  
    @IsNumber({ maxDecimalPlaces: 2 })
    price: number;
  
    @IsNumber({ maxDecimalPlaces: 2 })
    subtotal: number;
  }
