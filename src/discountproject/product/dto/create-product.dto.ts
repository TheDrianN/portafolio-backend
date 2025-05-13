import { IsInt, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    name: string;

    @IsNumber({maxDecimalPlaces:2})
    price: number;

    @IsInt()
    @IsPositive()
    stock: number;

    @IsString()
    img: string;

}
