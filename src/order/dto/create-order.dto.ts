import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsString()
  customer: string;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsString()
  product: string;
}
