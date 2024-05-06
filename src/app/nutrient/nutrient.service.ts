// user.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Nutrients } from './nutrient.entity';
import { CreateNutrientDto } from './dto/create-ntrient.dto';



@Injectable()
export class NutrientService {
  constructor(@InjectModel(Nutrients.name) private nutrientModel: Model<Nutrients>) {}

   async create(name: string, description: string, ): Promise<Nutrients> {
    try {
        const newNutrient = new this.nutrientModel({ name, description });
        return await newNutrient.save();

    } catch (error) {
        throw new Error('Failed to create nutrient');
    }
  }

  async findByname(name: string): Promise<Nutrients> {
    try {
      const nutrient = await this.nutrientModel.findOne({ name }).exec();
      if (!nutrient) {
        throw new NotFoundException('Nutrient not found');
      }
      return nutrient;
    } catch (error) {
      throw new Error('Failed to find nutrient by name');
    }
  }

  async findById(id: string): Promise<Nutrients> {
    try {
      const nutrient = await this.nutrientModel.findById(id).exec();
      if (!nutrient) {
        throw new NotFoundException('Nutrient not found');
      }
      return nutrient;
    } catch (error) {
      throw new NotFoundException('Failed to get nutrient by id');
    }
  }

 

  async findAll(): Promise<{ message: string, nutrients: Nutrients[] }> {
    try {
      const nutrients = await this.nutrientModel.find().exec();
      return { message: 'Nutrients retrieved successfully', nutrients };
    } catch (error) {
      throw new NotFoundException('Failed to find nutrients');
    }
  }

  async update(id: string, updatenutrientDto: CreateNutrientDto): Promise<Nutrients> {
    try {
      const updatedNutrient = await this.nutrientModel.findByIdAndUpdate(id, updatenutrientDto, { new: true }).exec();
      if (!updatedNutrient) {
        throw new NotFoundException('Nutrient not found');
      }
      return updatedNutrient;
    } catch (error) {
      throw new Error('Failed to update nutrient');
    }
  }

  async delete(id: string): Promise<{ message: string }> {
    try {
      const deleted = await this.nutrientModel.findByIdAndDelete(id).exec();
      if (!deleted) {
        throw new NotFoundException('Nutrient not found');
      }
      return { message: 'Nutrient deleted successfully' };
    } catch (error) {
      throw new Error('Failed to delete nutrient');
    }
  } 

}
