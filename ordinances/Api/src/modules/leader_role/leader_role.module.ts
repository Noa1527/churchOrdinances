import { Module } from '@nestjs/common';
import { LeaderRoleService } from './leader_role.service';
import { LeaderRoleController } from './leader_role.controller';

@Module({
  providers: [LeaderRoleService],
  controllers: [LeaderRoleController]
})
export class LeaderRoleModule {}
