import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { UserDto } from './dto/user.dto';
import { compare, hash } from 'bcrypt';
import { SALT } from 'src/constants';


@Injectable()
export class UserService {

    constructor(private prisma: PrismaService, private jwt: JwtService) { }

    async login(email: string, password: string) {
        email = email.toLowerCase()

        const user = await this.prisma.user.findFirst({
            where: {
                email
            }
        });

        if (!user || !(await compare(password, user.password))) {
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
        user.password = await hash(user.password, SALT)

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