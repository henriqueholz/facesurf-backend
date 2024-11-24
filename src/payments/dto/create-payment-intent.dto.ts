import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreatePaymentIntentDto {
  @IsUUID()
  photoId: string;

  @IsNumber()
  amount: number;

  @IsString()
  currency: string = 'usd';

  @IsString()
  paymentMethodId: string;
}