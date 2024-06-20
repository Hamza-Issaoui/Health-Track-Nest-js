import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';

import { NutrientService } from './nutrient.service';
import { CreateNutrientDto } from './dto/create-nutrient.dto';
import { Nutrients } from './nutrient.entity';

@Controller('nutrients')
export class NutrientssController {
  constructor(private readonly nutrientService: NutrientService) { }

  @Post()
  async createNutrient(@Body() createNutrientDto: CreateNutrientDto): Promise<Nutrients> {
    return this.nutrientService.create(createNutrientDto);
  }

  @Get(':id') // Define the route parameter
  async findNutrientById(@Param('id') id: string): Promise<Nutrients> {
    return this.nutrientService.findById(id);
  }

  @Get('meal/:id')
  async findNutrientByMeal(@Param('id') id: string): Promise<Nutrients[]> {
    return this.nutrientService.findByMealId(id);
  }

  @Get()
  async findAllNutrients(): Promise<{ message: string, nutrients: Nutrients[] }> {
    return await this.nutrientService.findAll();
  }

  @Patch(':id')
  async updateNutrient(
    @Param('id') id: string,
    @Body() updatenutrientDto: CreateNutrientDto,
  ): Promise<Nutrients> {
    return this.nutrientService.update(id, updatenutrientDto);
  }

  @Delete(':id')
  deleteNutrient(@Param('id') id: string) {
    return this.nutrientService.delete(id);
  }
}
