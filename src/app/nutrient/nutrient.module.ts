import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from '../shared/database/databse.module';
import { NutrientSchema } from './nutrient.entity';
import { NutrientssController } from './nutrient.controller';
import { NutrientService } from './nutrient.service';


@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: 'Nutrients', schema: NutrientSchema}]),
  ],
  controllers: [NutrientssController],
  providers: [NutrientService],
})
export class NutrientModule {}
