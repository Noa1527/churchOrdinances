import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Member, MemberSchema } from './member.schema';
import { Ordinance, OrdinanceSchema } from '../ordinance/ordinance.schema';
import { OrdinanceService } from '../ordinance/ordinance.service';
import { Blessing, BlessingSchema } from '../blessing/blessing.schema';
import { BlessingService } from '../blessing/blessing.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Member.name, schema: MemberSchema },
      { name: Ordinance.name, schema: OrdinanceSchema },
      { name: Blessing.name, schema: BlessingSchema },

    ]),
  ],
  providers: [MemberService, OrdinanceService, BlessingService],
  controllers: [MemberController]
})
export class MemberModule {}
