// user.service.ts

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Meals } from './meal.entity';
import { CreateMealDto } from './dto/create-meal.dto';
import { Users } from '../users/user.entity';
import { Nutrients } from '../nutrient/nutrient.entity';

@Injectable()
export class MealService {
  constructor(
    @InjectModel(Meals.name) private mealModel: Model<Meals>,
    @InjectModel(Users.name) private userModel: Model<Users>,
  ) { }

 async create(createMealDto: CreateMealDto): Promise<Meals> {
  const { name, date, totalCalories, mealType, notes, userId, nutrients } = createMealDto;

  // Create new meal object
  const newMeal = new this.mealModel({
    name,
    date,
    totalCalories,
    mealType,
    notes,
    user: userId
  });

  try {
    const meal = await newMeal.save();
    await this.userModel.findByIdAndUpdate(userId, {
      $push: { meals: meal }
    });

    return meal;
  } catch (error) {
    throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  }
}


  async findByname(name: string): Promise<Meals> {
    try {
      const meal = await this.mealModel.findOne({ name }).exec();
      if (!meal) {
        throw new HttpException("Meal not found", HttpStatus.BAD_REQUEST);
      }
      return meal;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findById(id: string): Promise<Meals> {
    try {
      const meal = await this.mealModel.findById(id).exec();
      if (!meal) {
        throw new HttpException("Meal not found", HttpStatus.BAD_REQUEST);
      }
      return meal;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<{ message: string, meals: Meals[] }> {
    try {
      const meals = await this.mealModel.find({})
        .populate('nutrients')
        .exec();
      return { message: 'Meals retrieved successfully', meals };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updatemealDto: CreateMealDto): Promise<Meals> {
    try {
      const updatedMeal = await this.mealModel.findByIdAndUpdate(id, updatemealDto, { new: true }).exec();
      if (!updatedMeal) {
        throw new HttpException("Meal not found", HttpStatus.BAD_REQUEST);
      }
      return updatedMeal;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string): Promise<{ message: string }> {
    try {
        const meal = await this.mealModel.findById(id).exec();
        if (!meal) {
            throw new HttpException("Meal not found", HttpStatus.BAD_REQUEST);
        }
        await this.userModel.findByIdAndUpdate(meal.user, {
            $pull: { meals: meal },
        }).exec();
        const deleted = await this.mealModel.findByIdAndDelete(id).exec();
        if (!deleted) {
            throw new HttpException('Meal not found', HttpStatus.BAD_REQUEST);
        }
        return { message: 'Meal deleted successfully' };
    } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
}

}
