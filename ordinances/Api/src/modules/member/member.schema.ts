import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

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

    @Prop({type: String, enum: Object.values(Gender), default: Gender.Male})
    gender: Gender;

    @Prop([{ type: String, ref: 'Comment' }])
    comments: string[];

    @Prop({ type: String, ref: 'Ordinance' })
    ordinance: string;

    @Prop({ type: String, ref: 'Blessing' })
    blessing: string;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
