// user.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Meals } from './meal.entity';
import { CreateMealDto } from './dto/create-meal.dto';


@Injectable()
export class MealService {
  constructor(@InjectModel(Meals.name) private mealModel: Model<Meals>) {}

   async create(name: string, description: string, ): Promise<Meals> {
    try {
        const newMeal = new this.mealModel({ name, description });
        return await newMeal.save();

    } catch (error) {
        throw new Error('Failed to create meal');
    }
  }

  async findByname(name: string): Promise<Meals> {
    try {
      const meal = await this.mealModel.findOne({ name }).exec();
      if (!meal) {
        throw new NotFoundException('Meal not found');
      }
      return meal;
    } catch (error) {
      throw new Error('Failed to find meal by name');
    }
  }

  async findById(id: string): Promise<Meals> {
    try {
      const meal = await this.mealModel.findById(id).exec();
      if (!meal) {
        throw new NotFoundException('Meal not found');
      }
      return meal;
    } catch (error) {
      throw new NotFoundException('Failed to get meal by id');
    }
  }

 

  async findAll(): Promise<{ message: string, meals: Meals[] }> {
    try {
      const meals = await this.mealModel.find().exec();
      return { message: 'Meals retrieved successfully', meals };
    } catch (error) {
      throw new NotFoundException('Failed to find meals');
    }
  }

  async update(id: string, updatemealDto: CreateMealDto): Promise<Meals> {
    try {
      const updatedMeal = await this.mealModel.findByIdAndUpdate(id, updatemealDto, { new: true }).exec();
      if (!updatedMeal) {
        throw new NotFoundException('Meal not found');
      }
      return updatedMeal;
    } catch (error) {
      throw new Error('Failed to update meal');
    }
  }

  async delete(id: string): Promise<{ message: string }> {
    try {
      const deleted = await this.mealModel.findByIdAndDelete(id).exec();
      if (!deleted) {
        throw new NotFoundException('Meal not found');
      }
      return { message: 'Meal deleted successfully' };
    } catch (error) {
      throw new Error('Failed to delete meal');
    }
  } 

}
