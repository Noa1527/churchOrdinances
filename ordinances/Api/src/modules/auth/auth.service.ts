import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './strategies/jwt-payload.interface';
import { RegisterDto } from './dto/register.dto';


@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  async register(registerDto: RegisterDto) {
    const { email } = registerDto;

    // Vérifie si l'utilisateur existe déjà
    const userInDb = await this.userService.findOneByEmail(email);
    if (userInDb) {
        throw new ConflictException('Email already registered');
    }

    // Hash le mot de passe
    const hashedPassword = await this.hashPassword(registerDto.password);

    // Crée un nouvel objet utilisateur
    const newUser = {
        firstName: registerDto.firstName,
        lastName: registerDto.lastName,
        email: email,
        password: hashedPassword,
        isAdmin: registerDto.isAdmin,
        isActive: registerDto.isActive,
        gender: registerDto.gender,
    };
    // Enregistre le nouvel utilisateur dans la base de données
    return this.userService.create(newUser);
  }

  async validateUser(email: string, pass: string): Promise<any> {
    console.log('validateUser: ', email, pass);
    const user = await this.userService.findOneByEmail(email);
    console.log('validateUser1: ', user);
    let passwordCrypt = bcrypt.compare(pass, user.password)
    console.log('crypte', passwordCrypt);
    
    if (user && bcrypt.compare(pass, user.password)) {
        console.log('validateUser2: ', user, ' is valid', pass, user.password, 'bcrypt', bcrypt.compare(pass, user.password), );
        
    const { password, ...result } = user;
    console.log('validateUser3: ', result);
    
    return result;
    }
    return null;
}

  async login(email: string, pass: string): Promise<any> {
    console.log("1",email, pass);
    const user = await this.userService.findOneByEmail(email);
    console.log("2",user);
    let passwordCrypt = bcrypt.compare(pass, user.password)
    console.log("3",passwordCrypt);
    if (!passwordCrypt) {
        throw new UnauthorizedException();   
    } 
    console.log( user.email,  user._id,  user.isAdmin);
    
    const payload = { email: user.email, sub: user._id, isAdmin: user.isAdmin };
    console.log("4",payload);
    
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}