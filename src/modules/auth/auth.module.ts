import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Auth]),
  JwtModule.register({
    global:true,
    secret:process.env.SECRET_KEY,
    signOptions:{expiresIn:'190000s'},
  }),

],

  controllers:[AuthController],
  providers: [AuthService],
})
export class AuthModule {}
