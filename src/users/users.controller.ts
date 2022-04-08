import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRegisterDTO } from './dto/user-request.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  getHello(): string {
    return 'typeorm in nest, just coding';
  }

  @Post()
  async signUp(@Body() userRegisterDTO: UserRegisterDTO) {
    return await this.userService.registerUser(userRegisterDTO);
  }

  @Post('login')
  login(): string {
    return 'login';
  }
}