import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export enum Gender {
  Male = 'H',
  Female = 'F',
}

export type MemberDocument = HydratedDocument<Member>;

@Schema()
export class Member {

    @Prop({required: true})
    firstName: string;

    @Prop({required: true})
    lastName: string;
    
    @Prop({required: true})
    email: string;
    
    @Prop()
    birthDate: Date;

    @Prop()
    phone: string;

    @Prop({type: String, enum: Object.values(Gender)})
    gender: Gender;

    @Prop([{ type: String, ref: 'Comment' }])
    comments: string[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'LeaderRoles' })
    leaderRoles: mongoose.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Ordinance' })
    ordinance: mongoose.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Blessing' })
    blessing: mongoose.Types.ObjectId;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
