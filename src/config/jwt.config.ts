import { JwtModuleAsyncOptions } from "@nestjs/jwt";

export const JWTConfig: JwtModuleAsyncOptions = {
    useFactory: () => {
        return {
            secret: process.env.JWT_SECRET || '',
            signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '1h' },
        }
    }
}