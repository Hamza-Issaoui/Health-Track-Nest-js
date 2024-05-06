// user.controller.ts

import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { MealService } from './meal.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { Meals } from './meal.entity';


@Controller('meals')
export class MealsController {
  constructor(private readonly mealService: MealService) {}

  @Post()
  async createMeal(@Body() createmealDto: CreateMealDto): Promise<Meals> {
    const { name, description } = createmealDto;
    return this.mealService.create(name, description);
  }

   @Get('id/:id') // Define the route parameter
  async findMealById(@Param('id') id: string): Promise<Meals> {
    return this.mealService.findById(id);
  }
  
  @Get('name/:name') 
  async findMealByName(@Param('name') name: string): Promise<Meals> {
    return this.mealService.findByname(name);
  }


  @Get('getAll')
  async findAllMeals(): Promise<{ message: string, meals: Meals[] }> {
    return await this.mealService.findAll();
  }

  @Patch('update/:id')
  async updateMeal(
    @Param('id') id: string,
    @Body() updateMealDto: CreateMealDto,
  ): Promise<Meals> {
    return this.mealService.update(id, updateMealDto);
  }


  @Delete('delete/:id')
  deleteMeal(@Param('id') id: string) {
    return this.mealService.delete(id);
  } 
}
