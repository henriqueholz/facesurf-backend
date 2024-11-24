import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { PhotosService } from './photos.service';
import { PrismaModule } from '../prisma/prisma.module';
import { FaceApiService } from '../services/face-api.service';
import { PhotosController } from './photos.controller';

@Module({
  imports: [
    PrismaModule,
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [PhotosController],
  providers: [PhotosService, FaceApiService],
  exports: [PhotosService],
})
export class PhotosModule {}