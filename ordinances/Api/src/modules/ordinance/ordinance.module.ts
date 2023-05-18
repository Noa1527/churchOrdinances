import { Module } from '@nestjs/common';
import { OrdinanceService } from './ordinance.service';
import { OrdinanceController } from './ordinance.controller';

@Module({
  providers: [OrdinanceService],
  controllers: [OrdinanceController]
})
export class OrdinanceModule {}
