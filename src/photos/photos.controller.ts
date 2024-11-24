import { Controller, Post, UseGuards, UseInterceptors, UploadedFile, Body, Get, Param, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PhotosService } from './photos.service';
import { FaceApiService } from '../services/face-api.service';
import { CreatePhotoDto } from './dto/create-photo.dto';

@Controller('photos')
export class PhotosController {
  constructor(
    private readonly photosService: PhotosService,
    private readonly faceApiService: FaceApiService,
  ) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('photo'))
  async uploadPhoto(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPhotoDto: CreatePhotoDto,
  ) {
    const faceDescriptor = await this.faceApiService.processUploadedPhoto(file.buffer);
    return this.photosService.uploadPhoto(createPhotoDto.photographerId, file, {
      ...createPhotoDto,
      faceDescriptor,
    });
  }

  @Get()
  async getPhotos(
    @Query('photographerId') photographerId?: string,
    @Query('status') status?: 'ACTIVE' | 'SOLD',
  ) {
    return this.photosService.findAll({ photographerId, status });
  }

  @Get(':id')
  async getPhoto(@Param('id') id: string) {
    return this.photosService.findOne(id);
  }
}
