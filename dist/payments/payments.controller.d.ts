import { PaymentsService } from './payments.service';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';
import { Response } from 'express';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    createPaymentIntent(createPaymentIntentDto: CreatePaymentIntentDto): Promise<{
        clientSecret: string;
    }>;
    handleWebhook(request: Request, response: Response): Promise<void>;
    confirmPayment(paymentIntentId: string): Promise<any>;
}
