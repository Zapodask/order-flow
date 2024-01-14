import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @Inject('PAYMENTS_SERVICE')
    private readonly client: ClientProxy,
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

  async sendToPayment(order: Order) {
    try {
      await this.client.emit('validate_payment', {
        id: crypto.randomUUID(),
        data: {
          id: order.id,
          amount: order.amount,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
