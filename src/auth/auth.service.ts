import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from "bcrypt";
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(data: { email: string; password: string; name: string }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const photographer = await this.prisma.photographer.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
    return this.generateToken(photographer);
  }

  async login(email: string, password: string) {
    const photographer = await this.prisma.photographer.findUnique({
      where: { email },
    });
    if (!photographer) throw new UnauthorizedException();

    const isValid = await bcrypt.compare(password, photographer.password);
    if (!isValid) throw new UnauthorizedException();

    return this.generateToken(photographer);
  }

  private generateToken(photographer: { id: string; email: string }) {
    return this.jwtService.sign({
      sub: photographer.id,
      email: photographer.email,
    });
  }
}
