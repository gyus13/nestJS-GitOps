import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRegisterDTO } from './dto/user.request.dto';
import { LoginRequestDto} from "./dto/login.request.dto";

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
  async login(@Body() loginRequestDto: LoginRequestDto){
    return await this.userService.verifyUserAndJWT(loginRequestDto);
  }

  @Get()
  async getUsers() {
    return await this.userService.findAllUser();
  }
}
