import { PrismaService } from '../prisma/prisma.service';
import Stripe from 'stripe';
export declare class PaymentsService {
    private prisma;
    private stripe;
    constructor(prisma: PrismaService);
    createPaymentIntent(photoId: string, buyerEmail: string): Promise<{
        clientSecret: string;
    }>;
    handleWebhook(event: Stripe.Event): Promise<void>;
}
