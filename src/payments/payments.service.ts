import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor(private prisma: PrismaService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
    });
  }

  async createPaymentIntent(photoId: string, buyerEmail: string) {
    const photo = await this.prisma.photo.findUnique({
      where: { id: photoId },
    });

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: Math.round(photo.price * 100), // Convert to cents
      currency: 'usd',
      metadata: { photoId, buyerEmail },
    });

    await this.prisma.purchase.create({
      data: {
        photoId,
        buyerEmail,
        amount: photo.price,
        stripeId: paymentIntent.id,
      },
    });

    return { clientSecret: paymentIntent.client_secret };
  }

  async handleWebhook(event: Stripe.Event) {
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      
      await this.prisma.purchase.update({
        where: { stripeId: paymentIntent.id },
        data: { status: 'COMPLETED' },
      });

      await this.prisma.photo.update({
        where: { id: paymentIntent.metadata.photoId },
        data: { status: 'SOLD' },
      });
    }
  }
}