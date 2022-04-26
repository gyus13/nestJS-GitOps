import {Injectable, Logger, UnauthorizedException} from '@nestjs/common';
import { UserRegisterDTO } from './dto/user.request.dto';
import {UserEntity} from "./users.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {LoginRequestDto} from "./dto/login.request.dto";
import {bcrypt} from "bcrypt";

@Injectable()
export class UsersService {
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

  async verifyUserAndJWT(loginRequestDto: LoginRequestDto) {
    const { email, password} = loginRequestDto;

    const user = await this.usersRepository.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }

    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if(!isPasswordValidated) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }

    const payload = { email: email, sub: user.id };

    return {
      token: this.jwtService.sign(payload),
    };


  }

  async findAllUser() {
    return ''
  }

}
