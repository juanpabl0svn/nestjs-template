import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { loginDto } from './dto/login.dto';
import { JWTGuard } from 'src/guards/jwt.guard';




@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }


  @Post('login')
  login(@Body() body: loginDto) {
    return this.userService.login(body.email, body.password);
  }


  @Post('register')
  register(@Body() body: UserDto) {
    return this.userService.register(body);
  }

  @UseGuards(JWTGuard)
  @Get()
  test() {
    return 'Hello'
  }




}
