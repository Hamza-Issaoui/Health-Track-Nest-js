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

 async create(createMealDto: CreateMealDto): Promise<any> {
  const { name, date, totalCalories, mealType, notes, userId, nutrients } = createMealDto;

  // Create new meal object
  const newMeal = new this.mealModel({
    name,
    date,
    totalCalories,
    mealType,
    notes,
    nutrients,
    user: userId
  });

  try {
    const meal = (await newMeal.save())
    console.log("meals", meal);
    
    await this.userModel.findByIdAndUpdate(userId, {
      $push: { meals: meal }
    })

    return {
      status: HttpStatus.CREATED,
      msg: 'Meal Created Successfully!',
      meal: meal,
  };
  } catch (error) {
    throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  }
}

  async findByUserId(id: string): Promise<Meals[]> {
    try {
      const meal = await this.mealModel.find({ user: id }).populate('user').exec();
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

  async findMealByUserAndDate(userId: string, date: Date): Promise<Meals[]> {
    try {
      // Convert the date to the start and end of the day
      const startOfDay = new Date(date);
      startOfDay.setUTCHours(0, 0, 0, 0);

      const endOfDay = new Date(date);
      endOfDay.setUTCHours(23, 59, 59, 999);

      // Fetch meals that match the userId and fall within the start and end of the given date
      const meals = await this.mealModel.find({
        user: userId,
        date: { $gte: startOfDay, $lte: endOfDay }
      }).populate('user').exec();

      if (!meals || meals.length === 0) {
        throw new HttpException('No meals found for the given date', HttpStatus.NOT_FOUND);
      }

      return meals;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<{ message: string, meals: Meals[] }> {
    try {
      const meals = await this.mealModel.find({})
      .populate('user')
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
