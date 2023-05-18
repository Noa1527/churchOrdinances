import { Module } from '@nestjs/common';
import { BlessingService } from './blessing.service';
import { BlessingController } from './blessing.controller';

@Module({
  providers: [BlessingService],
  controllers: [BlessingController]
})
export class BlessingModule {}
