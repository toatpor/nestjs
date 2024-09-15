import { Module } from '@nestjs/common';
import { MetaOptionController } from './meta-option.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaOption } from './meta-option.entity';
import { MetaOptionsService } from './providers/meta-options.service';

@Module({
  controllers: [MetaOptionController],
  imports: [TypeOrmModule.forFeature([MetaOption])],
  providers: [MetaOptionsService],
})
export class MetaOptionModule {}
