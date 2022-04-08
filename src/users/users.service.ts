import {Injectable, Logger, UnauthorizedException} from '@nestjs/common';
import { UserRegisterDTO } from './dto/user-request.dto';
import {UserEntity} from "./users.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name)

  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async registerUser(userRegisterDTO: UserRegisterDTO) {
    const { email, password } = userRegisterDTO;
    const user = await this.usersRepository.findOne({ email });

    if (user) {
      throw new UnauthorizedException('해당하는 이메일은 이미 존재합니다.');
    }

    await this.usersRepository.save({
      ...userRegisterDTO,
      password,
    });
  }
}
