import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { PhotosModule } from '../photos/photos.module';
import { PrismaModule } from '../prisma/prisma.module';
import { FaceApiService } from '../services/face-api.service';
import { SearchController } from './search.controller';

@Module({
  imports: [PrismaModule, PhotosModule],
  controllers: [SearchController],
  providers: [SearchService, FaceApiService],
})
export class SearchModule {}