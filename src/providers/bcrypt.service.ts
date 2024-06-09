import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";


@Injectable()
export class BcryptService {

    saltRounds = +process.env.SALT_ROUNDS || 10;

    async hash(password: string): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }

    async compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash)
    }

    async createUUID(): Promise<string> {
        return bcrypt.hash(String(Date.now()), this.saltRounds);
    }
}