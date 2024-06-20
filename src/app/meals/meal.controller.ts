import { Controller, Post, Body, Get, Param, Patch, Delete, HttpException, HttpStatus } from '@nestjs/common';

import { MealService } from './meal.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { Meals } from './meal.entity';

@Controller('meals')
export class MealsController {
  constructor(private readonly mealService: MealService) { }

  @Post()
  async createMeal(@Body() createMealDto: CreateMealDto): Promise<Meals> {
    return this.mealService.create(createMealDto);
  }

  @Get(':id')
  async findMealById(@Param('id') id: string): Promise<Meals> {
    return this.mealService.findById(id);
  }

  @Get('user/:id')
  async findMealByUserId(@Param('id') id: string): Promise<Meals[]> {
    return this.mealService.findByUserId(id);
  }

  @Get('user/:userId/date/:date')
  async findMealByDate(
    @Param('userId') userId: string,
    @Param('date') date: string
  ): Promise<Meals[]> {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      throw new HttpException('Invalid date format', HttpStatus.BAD_REQUEST);
    }
    return this.mealService.findMealByUserAndDate(userId, parsedDate);
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
