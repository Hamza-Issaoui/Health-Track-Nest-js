import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Nutrients } from './nutrient.entity';
import { CreateNutrientDto } from './dto/create-ntrient.dto';
import { Meals } from '../meals/meal.entity';

@Injectable()
export class NutrientService {
  constructor(

    @InjectModel(Nutrients.name) private nutrientModel: Model<Nutrients>,
    @InjectModel(Meals.name) private mealModel: Model<Meals>,

  ) { }

  async create(createNutrientDto: CreateNutrientDto): Promise<Nutrients> {
    const { name, description, mealId } = createNutrientDto;

    const newNutrient = new this.nutrientModel({
      name,
      description,
      meal: mealId,
    });

    try {
      const nutrient = await newNutrient.save();
      await this.mealModel.findByIdAndUpdate(mealId, { $push: { nutrients: nutrient._id } });
      return nutrient;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findByname(name: string): Promise<Nutrients> {
    try {
      const nutrient = await this.nutrientModel.findOne({ name }).exec();
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

  async update(id: string, updatenutrientDto: CreateNutrientDto): Promise<Nutrients> {
    try {
      const updatedNutrient = await this.nutrientModel.findByIdAndUpdate(id, updatenutrientDto, { new: true }).exec();
      if (!updatedNutrient) {
        throw new HttpException("Nutrient not found", HttpStatus.BAD_REQUEST);
      }
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
      await this.mealModel.findByIdAndUpdate(nutrient.meal, {
        $pull: { nutrients: nutrient._id },
      }).exec();
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
