import { Injectable } from '@nestjs/common';
import { UserRegisterDTO } from './dto/user-request.dto';

@Injectable()
export class UsersService {
  async registerUser(body: UserRegisterDTO) {
    const { email, username, passwd } = body;
    
  }
}
