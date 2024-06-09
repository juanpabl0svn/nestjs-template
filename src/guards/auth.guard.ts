import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FastifyRequest } from 'fastify';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<FastifyRequest>();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: process.env.JWT_SECRET,
                }
            );
            // Asignar el payload al objeto de la solicitud para acceder a él en los manejadores de rutas
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: FastifyRequest): string | undefined {
        const authorizationHeader = request.headers.authorization;
        if (!authorizationHeader) {
            return undefined;
        }
        const [type, token] = authorizationHeader.split(' ');
        return type === 'Bearer' ? token : undefined;
    }
}
