"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const stripe_1 = require("stripe");
let PaymentsService = class PaymentsService {
    constructor(prisma) {
        this.prisma = prisma;
        this.stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2023-10-16',
        });
    }
    async createPaymentIntent(photoId, buyerEmail) {
        const photo = await this.prisma.photo.findUnique({
            where: { id: photoId },
        });
        const paymentIntent = await this.stripe.paymentIntents.create({
            amount: Math.round(photo.price * 100),
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
    async handleWebhook(event) {
        if (event.type === 'payment_intent.succeeded') {
            const paymentIntent = event.data.object;
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
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map