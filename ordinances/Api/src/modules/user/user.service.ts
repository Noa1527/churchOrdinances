import { Injectable } from '@nestjs/common';
import { UserDocument, User} from './user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async create(user: Partial<User>): Promise<User> {
        const newUser = new this.userModel(user);
        return newUser.save();
    }

    async findAll() {
        return await this.userModel.find().exec();
    }

    async findOneByEmail(email: string) {
        return await this.userModel.findOne({ email }).exec();
    }

    async findOneById(id: string) {
        return await this.userModel.findById(id).exec();
    }

    async findOneByFirstName(firstName: string) {
        return await this.userModel.findOne({ firstName }).exec();
    }

    async findOneByLastName(lastName: string) {
        return await this.userModel.findOne({ lastName }).exec();
    }

    // async update(id: string, userDto: CreateUserDto) {

    //     const existingUser = await this.userModel.findOne({ email: userDto.email });

        
    //     const hashedPassword = await bcrypt.hash(userDto.password, 10);

    //     return await this.userModel.findByIdAndUpdate(id, { ...userDto, password: hashedPassword }, { new: true });
    // }

    async delete(id: string) {
        return await this.userModel.findByIdAndRemove(id);
    }
}
