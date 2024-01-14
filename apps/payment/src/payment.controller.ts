import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

import { PaymentService } from './payment.service';
import { ValidatePaymentDto } from './dto/validate-payment.dto';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @MessagePattern('validate_payment')
  async validatePayment(
    @Payload() payload: ValidatePaymentDto,
    @Ctx() context: RmqContext,
  ) {
    const {
      data: { id, amount },
    } = payload;

    const isValidPayment = this.paymentService.validatePayment(amount);

    await fetch('http://localhost:3000/order/' + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: isValidPayment ? 'paid' : 'failed',
      }),
    });

    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);
  }
}
