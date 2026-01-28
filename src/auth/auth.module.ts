import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RestauranteModule } from '../restaurante/restaurante.module';
import { Bcrypt } from './bcrypt/bcrypt';
import { jwtConstants } from './constants/constants';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports: [
    forwardRef(() => RestauranteModule),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [Bcrypt, AuthService, LocalStrategy, JwtStrategy],
  exports: [Bcrypt],
})
export class AuthModule {}
