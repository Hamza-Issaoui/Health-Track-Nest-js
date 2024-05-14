// user.controller.ts

import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { NutrientService } from './nutrient.service';
import { CreateNutrientDto } from './dto/create-ntrient.dto';
import { Nutrients } from './nutrient.entity';


@Controller('nutrients')
export class NutrientssController {
  constructor(private readonly nutrientService: NutrientService) {}

  @Post()
  async createNutrient(@Body() createmealDto: CreateNutrientDto): Promise<Nutrients> {
    const { name, description } = createmealDto;
    return this.nutrientService.create(name, description);
  }

   @Get(':id') // Define the route parameter
  async findNutrientById(@Param('id') id: string): Promise<Nutrients> {
    return this.nutrientService.findById(id);
  }
  
  @Get(':name') 
  async findNutrientByName(@Param('name') name: string): Promise<Nutrients> {
    return this.nutrientService.findByname(name);
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
