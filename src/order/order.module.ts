import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './entities/order.entity';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [TypeOrmModule.forFeature([Order])],
})
export class OrderModule {}
