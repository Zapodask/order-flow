import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create(createOrderDto);
    return await this.orderRepository.save(order);
  }

  async updateStatus(id: string, status: string): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id } });
    order.status = status;
    return await this.orderRepository.save(order);
  }
}
