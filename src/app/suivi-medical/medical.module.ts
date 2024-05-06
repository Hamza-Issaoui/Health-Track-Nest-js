import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from '../database/databse.module';
import { MedicalSchema } from './medical.entity';
import { MedicalController } from './medical.controller';
import { MedicalService } from './medical.service';



@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: 'Medical', schema: MedicalSchema}]),
  ],
  controllers: [MedicalController],
  providers: [MedicalService],
})
export class MedicalModule {}
