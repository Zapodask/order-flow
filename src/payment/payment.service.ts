import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentService {
  validatePayment(amount: number) {
    return amount > 10;
  }
}
