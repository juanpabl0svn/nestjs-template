import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';




@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }


  @Post('login')
  login(@Body() body: { email: string, password: string; }) {
    return this.userService.login(body.email, body.password);
  }


  @Post('register')
  register(@Body() body: UserDto) {
    return this.userService.register(body);

  }




}
