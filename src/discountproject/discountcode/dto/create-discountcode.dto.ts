import { IsDate, IsDecimal, IsEnum, IsNumber, IsString, MaxLength } from "class-validator";
import { DiscountType } from "@prisma/client";
import { DiscountState } from "@prisma/client";
import { Transform } from "class-transformer";

export class CreateDiscountcodeDto {

    @IsString()
    @MaxLength(10)
    code: string;

    @IsString()
    description: string;

    @IsEnum(DiscountType)
    discount_type:DiscountType;

    @IsNumber({ maxDecimalPlaces: 2 })
    discount_value: number;
    
    @IsDate()
    @Transform(({ value }) => new Date(value))
    valid_from: Date;

    @IsDate()
    @Transform(({ value }) => new Date(value))
    valid_until: Date;

    @IsEnum(DiscountState)
    status:DiscountState;
    

}
