import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateOrderStatusDto {
  @ApiProperty()
  @IsString()
  status: string;
}
