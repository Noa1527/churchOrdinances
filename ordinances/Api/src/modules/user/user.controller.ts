import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';
// import { AuthGuard } from '../auth/guards/jwt-auth.guard';
// import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    // @get all users
    // @UseGuards(AuthGuard)
    @Get()
    async findAll() {
        return this.userService.findAll();
    }

}
