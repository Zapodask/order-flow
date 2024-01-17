import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseFilters,
} from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { Http2gRPCExceptionFilter } from '../filters/http2gRPCException.filter';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    const order = await this.orderService.create(createOrderDto);

    await this.orderService.sendToPayment(order);

    return order;
  }

  @GrpcMethod('OrderService')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseFilters(new Http2gRPCExceptionFilter())
  async updateStatus(@Payload() updateOrderStatusDto: UpdateOrderStatusDto) {
    await this.orderService.updateStatus(
      updateOrderStatusDto.id,
      updateOrderStatusDto.status,
    );
  }
}
