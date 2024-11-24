import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PhotosModule } from '../photos/photos.module';
import { PaymentsController } from './payments.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule, PhotosModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}