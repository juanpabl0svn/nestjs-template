import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { BcryptService } from 'src/providers/bcrypt.service';
import { PrismaService } from 'src/providers/prisma.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {


    constructor(private prisma: PrismaService, private jwt: JwtService, private bcrypt: BcryptService) { }


    async login(email: string, password: string) {
        email = email.toLowerCase()

        const user = await this.prisma.user.findFirst({
            where: {
                email
            }
        });

        if (!user || !(await this.bcrypt.compare(password, user.password))) {
            throw new HttpException('email or password incorrect', 400)
        }

        const token = this.jwt.sign({ id: user.id })

        delete user.password

        return {
            token,
            ...user
        }


    }


    async register(user: UserDto) {
        user.email = user.email.toLowerCase()
        user.password = await this.bcrypt.hash(user.password)

        const createdUser = await this.prisma.user.create({
            data: user
        });

        if (!createdUser) {
            throw new HttpException('user not created', 500)
        }

        const token = this.jwt.sign({ id: createdUser.id })

        delete createdUser.password

        return {
            token,
            ...createdUser

        }

    }
}