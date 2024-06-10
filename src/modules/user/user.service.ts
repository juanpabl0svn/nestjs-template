import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { Prisma } from '@prisma/client';
// import { PrismaService } from 'prisma/prisma.service';
import { UserDto } from './dto/user.dto';
import { compare, hash } from 'bcrypt';
import { JWTConfig, SALT } from 'src/config';


@Injectable()
export class UserService {

    constructor(private jwt: JwtService) { }

    async login(email: string, password: string) {
        email = email.toLowerCase()


        // const user = await this.prisma.user.findFirst({
        //     where: {
        //         email
        //     }
        // });


        const user = {
            id: '1',
            password: '$2b$10$DWQjjba7CWr5iNFIogoOyOGjiJ/hrU4tRWBAAcQenSY94xiEVvR02'
        }



        if (!user || !(await compare(password, user.password))) {
            throw new HttpException('email or password incorrect', 400)
        }
        const token = await this.jwt.signAsync({ id: user.id })
        delete user.password
        return {
            token,
            ...user
        }
    }


    async register(user: UserDto) {
        user.email = user.email.toLowerCase()
        user.password = await hash(user.password, SALT)

        // const createdUser = await this.prisma.user.create({
        //     data: user
        // });

        const createdUser = {
            id: '1',
            email: '',
            password: 'amigos'
        }

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