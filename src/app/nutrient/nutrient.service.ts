import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Nutrients } from './nutrient.entity';
import { CreateNutrientDto } from './dto/create-nutrient.dto';
import { Meals } from '../meals/meal.entity';
import { NutrientCalculator } from './nutrient-calculator';

@Injectable()
export class NutrientService {
  constructor(

    @InjectModel(Nutrients.name) private nutrientModel: Model<Nutrients>,
    @InjectModel(Meals.name) private mealModel: Model<Meals>,

  ) { }

  async create(createNutrientDto: CreateNutrientDto): Promise<any> {
    const { name, quantity, unit, type, source, mealId } = createNutrientDto;

    const calories = NutrientCalculator.calculateCalories(quantity, type);

    const newNutrient = new this.nutrientModel({
      name,
      quantity,
      unit,
      type,
      source,
      calories,
      meal:mealId
    });

    try {
      const nutrient = await newNutrient.save();
      await this.mealModel.findByIdAndUpdate(mealId, { 
        $push: { nutrients: nutrient },
        $inc: { totalCalories: calories }
      });
      return {
        status: HttpStatus.CREATED,
        msg: 'Medication Created Successfully!',
        nutrient: nutrient,
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findByMealId(id: string): Promise<Nutrients[]> {
    try {
      const nutrient = await this.nutrientModel.find({ meal: id }).exec();
      if (!nutrient) {
        throw new HttpException("Nutrient not found", HttpStatus.BAD_REQUEST);
      }
      return nutrient;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findById(id: string): Promise<Nutrients> {
    try {
      const nutrient = await this.nutrientModel.findById(id).exec();
      if (!nutrient) {
        throw new HttpException("Nutrient not found", HttpStatus.BAD_REQUEST);
      }
      return nutrient;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<{ message: string; nutrients: Nutrients[] }> {
    try {
      const nutrients = await this.nutrientModel.find({})
        .populate('meal')
        .exec();
      return { message: 'Nutrients retrieved successfully', nutrients };
    } catch (error) {
      console.error('Error retrieving nutrients:', error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateNutrientDto: CreateNutrientDto): Promise<Nutrients> {
    try {
      // Fetch the existing nutrient to be updated
      const existingNutrient = await this.nutrientModel.findById(id).exec();
      if (!existingNutrient) {
        throw new HttpException("Nutrient not found", HttpStatus.BAD_REQUEST);
      }
  
      // Calculate the new calories based on the updated quantity and type
      const newCalories = NutrientCalculator.calculateCalories(updateNutrientDto.quantity, updateNutrientDto.type);
  
      // Calculate the difference in calories between the old and new quantities
      const oldCalories = existingNutrient.calories;
      const calorieDifference = newCalories - oldCalories;
  
      // Update the nutrient with the new values and the recalculated calories
      const updatedNutrient = await this.nutrientModel.findByIdAndUpdate(
        id,
        { ...updateNutrientDto, calories: newCalories },
        { new: true }
      ).exec();
  
      if (!updatedNutrient) {
        throw new HttpException("Nutrient not found", HttpStatus.BAD_REQUEST);
      }
  
      // Update the associated meal's total calories by the calculated difference
      await this.mealModel.findByIdAndUpdate(
        updatedNutrient.meal,
        { $inc: { totalCalories: calorieDifference } }
      );
  
      return updatedNutrient;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  
  
  async delete(id: string): Promise<{ message: string }> {
    try {
      const nutrient = await this.nutrientModel.findById(id).exec();
      if (!nutrient) {
        throw new HttpException("Nutrient not found", HttpStatus.BAD_REQUEST);
      }
  
      const mealUpdate = await this.mealModel.findByIdAndUpdate(
        nutrient.meal,
        {
          $pull: { nutrients: nutrient },
          $inc: { totalCalories: -nutrient.calories }
        },
        { new: true }  // Return the updated document
      ).exec();
  
      if (!mealUpdate) {
        throw new HttpException("Meal not found", HttpStatus.BAD_REQUEST);
      }
  
      const deleted = await this.nutrientModel.findByIdAndDelete(id).exec();
      if (!deleted) {
        throw new HttpException("Nutrient not found", HttpStatus.BAD_REQUEST);
      }
  
      return { message: 'Nutrient deleted successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  
}
