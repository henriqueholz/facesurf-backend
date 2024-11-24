import { Controller, Post, UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SearchService } from './search.service';
import { FaceApiService } from '../services/face-api.service';
import { SearchPhotoDto } from './dto/search.photo.dto';

@Controller('search')
export class SearchController {
  constructor(
    private readonly searchService: SearchService,
    private readonly faceApiService: FaceApiService,
  ) {}

  @Post('photos')
  @UseInterceptors(FileInterceptor('selfie'))
  async searchPhotos(
    @UploadedFile() file: Express.Multer.File,
    @Body() searchPhotoDto: SearchPhotoDto,
  ) {
    const faceDescriptor = await this.faceApiService.detectFace(file.buffer);
    return this.searchService.findMatchingPhotos(faceDescriptor, searchPhotoDto);
  }
}
