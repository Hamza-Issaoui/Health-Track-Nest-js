// user.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Medical } from './medical.entity';
import { CreateMedicalDto } from './dto/create-medical.dto';



@Injectable()
export class MedicalService {
  constructor(@InjectModel(Medical.name) private medicalModel: Model<Medical>) {}

   async create(name: string, description: string, ): Promise<Medical> {
    try {
        const newMedicalRecord = new this.medicalModel({ name, description });
        return await newMedicalRecord.save();

    } catch (error) {
        throw new Error('Failed to create Medical-Record');
    }
  }

  async findByname(name: string): Promise<Medical> {
    try {
      const medicalRecord = await this.medicalModel.findOne({ name }).exec();
      if (!medicalRecord) {
        throw new NotFoundException('Medical-Record not found');
      }
      return medicalRecord;
    } catch (error) {
      throw new Error('Failed to find Medical-Record by name');
    }
  }

  async findById(id: string): Promise<Medical> {
    try {
      const medicalRecord = await this.medicalModel.findById(id).exec();
      if (!medicalRecord) {
        throw new NotFoundException('Medical-Record not found');
      }
      return medicalRecord;
    } catch (error) {
      throw new NotFoundException('Failed to get Medical-Record by id');
    }
  }

 

  async findAll(): Promise<{ message: string, medical: Medical[] }> {
    try {
      const medical = await this.medicalModel.find().exec();
      return { message: 'Medical-Records retrieved successfully', medical };
    } catch (error) {
      throw new NotFoundException('Failed to find all Medical-Records');
    }
  }

  async update(id: string, updatemedicalDto: CreateMedicalDto): Promise<Medical> {
    try {
      const updatedMedical = await this.medicalModel.findByIdAndUpdate(id, updatemedicalDto, { new: true }).exec();
      if (!updatedMedical) {
        throw new NotFoundException('Medical-Record not found');
      }
      return updatedMedical;
    } catch (error) {
      throw new Error('Failed to update Medical-Record');
    }
  }

  async delete(id: string): Promise<{ message: string }> {
    try {
      const deletedMedical = await this.medicalModel.findByIdAndDelete(id).exec();
      if (!deletedMedical) {
        throw new NotFoundException('Medical-Record not found');
      }
      return { message: 'Medical-Record deleted successfully' };
    } catch (error) {
      throw new Error('Failed to delete Medical-Record');
    }
  } 

}
