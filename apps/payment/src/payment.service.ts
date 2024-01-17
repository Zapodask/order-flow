import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable, lastValueFrom } from 'rxjs';

interface OrderGrpcService {
  updateStatus(data: { id: string; status: string }): Observable<void>;
}

@Injectable()
export class PaymentService implements OnModuleInit {
  private orderService: OrderGrpcService;

  constructor(@Inject('ORDER_PACKAGE') private clientGrpc: ClientGrpc) {}

  onModuleInit() {
    this.orderService =
      this.clientGrpc.getService<OrderGrpcService>('OrderService');
  }

  validatePayment(amount: number) {
    return amount > 10;
  }

  async sendUpdateOrderStatus(id: string, status: string) {
    await lastValueFrom(
      this.orderService.updateStatus({
        id,
        status,
      }),
    );
  }
}
