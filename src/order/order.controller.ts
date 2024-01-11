import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Patch(':id')
  updateStatus(
    @Param('id') id: string,
    @Body() { status }: UpdateOrderStatusDto,
  ) {
    return this.orderService.updateStatus(id, status);
  }
}
