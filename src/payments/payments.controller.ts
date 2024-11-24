import { Controller, Post, Body, UseGuards, Req, Res } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-payment-intent')
  @UseGuards(JwtAuthGuard)
  async createPaymentIntent(
    @Body() createPaymentIntentDto: CreatePaymentIntentDto,
  ) {
    return this.paymentsService.createPaymentIntent(
      createPaymentIntentDto.photoId,
      createPaymentIntentDto.buyerEmail,
    );
  }

  @Post('webhook')
  async handleWebhook(
    @Req() request: Request,
    @Res() response: Response,
  ) {
    const sig = request.headers['stripe-signature'];

    try {
      const event = this.paymentsService.constructEventFromPayload(
        request.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );

      await this.paymentsService.handleWebhook(event);
      response.json({ received: true });
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
    }
  }

  @Post('confirm-payment')
  @UseGuards(JwtAuthGuard)
  async confirmPayment(
    @Body('paymentIntentId') paymentIntentId: string,
  ) {
    return this.paymentsService.confirmPayment(paymentIntentId);
  }
}