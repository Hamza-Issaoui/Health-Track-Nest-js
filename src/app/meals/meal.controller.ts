// user.controller.ts

import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { MealService } from './meal.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { Meals } from './meal.entity';


@Controller('meals')
export class MealsController {
  constructor(private readonly mealService: MealService) {}

  @Post()
  async createMeal(@Body() createMealDto: CreateMealDto): Promise<Meals> {
    return this.mealService.create(createMealDto);
  }
   @Get(':id') // Define the route parameter
  async findMealById(@Param('id') id: string): Promise<Meals> {
    return this.mealService.findById(id);
  }
  
  @Get(':name') 
  async findMealByName(@Param('name') name: string): Promise<Meals> {
    return this.mealService.findByname(name);
  }


  @Get()
  async findAllMeals(): Promise<{ message: string, meals: Meals[] }> {
    return await this.mealService.findAll();
  }

  @Patch(':id')
  async updateMeal(
    @Param('id') id: string,
    @Body() updateMealDto: CreateMealDto,
  ): Promise<Meals> {
    return this.mealService.update(id, updateMealDto);
  }


  @Delete(':id')
  deleteMeal(@Param('id') id: string) {
    return this.mealService.delete(id);
  } 
}
