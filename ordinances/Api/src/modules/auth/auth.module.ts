import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.startegy';
import { LeaderRoleModule } from '../leader_role/leader_role.module';
import { LeaderRoleService } from '../leader_role/leader_role.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    LeaderRoleModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const secretKey = configService.get<string>('JWT_SECRET');
        console.log('Secret Key: ', secretKey); // Just to check if it's working
        return {
          secret: secretKey,
          signOptions: { expiresIn: '1d' },
        };
      },
    }),
  ],
  providers: [
    AuthService, 
    LocalStrategy, 
    JwtStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
