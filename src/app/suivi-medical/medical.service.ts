import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Medical } from './medical.entity';
import { CreateMedicalDto } from './dto/create-medical.dto';
import { Users } from '../users/user.entity';

@Injectable()
export class MedicalService {
  constructor(
    @InjectModel(Medical.name) private medicalModel: Model<Medical>,
    @InjectModel(Users.name) private userModel: Model<Users>,

  ) { }

  async create(createMedicalDto: CreateMedicalDto): Promise<Medical> {
      const {userId, ...medicalData } = createMedicalDto;
      // Create new meal object
  const newMedical = new this.medicalModel({
   ...medicalData,
    user: userId
  });

  try {
    const medical = await newMedical.save();
    await this.userModel.findByIdAndUpdate(userId, {
      $push: { medicals: medical }
    });

    return medical;

    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  
  
  async findByname(name: string): Promise<Medical> {
    try {
      const medicalRecord = await this.medicalModel.findOne({ user: name }).exec();
      if (!medicalRecord) {
        throw new HttpException("Medical-record not found", HttpStatus.BAD_REQUEST);
      }
      return medicalRecord;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findById(id: string): Promise<Medical> {
    try {
      const medicalRecord = await this.medicalModel.findById(id).exec();
      if (!medicalRecord) {
        throw new HttpException("Medical-record not found", HttpStatus.BAD_REQUEST);
      }
      return medicalRecord;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<{ message: string; medical: Medical[] }> {
    try {
      const medicalRecords = await this.medicalModel
        .find({})
        .populate('medications')
        .populate('allergies')
        .populate('symptoms')
        .populate('appointments')
        .exec();

      return { message: 'Medical records retrieved successfully', medical: medicalRecords };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updatemedicalDto: CreateMedicalDto): Promise<Medical> {
    try {
      const updatedMedical = await this.medicalModel.findByIdAndUpdate(id, updatemedicalDto, { new: true }).exec();
      if (!updatedMedical) {
        throw new HttpException("Medical-record not found", HttpStatus.BAD_REQUEST);
      }
      return updatedMedical;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string): Promise<{ message: string }> {
    try {
      const deletedMedical = await this.medicalModel.findByIdAndDelete(id).exec();
      if (!deletedMedical) {
        throw new HttpException("Medical-record not found", HttpStatus.BAD_REQUEST);
      }
      return { message: 'Medical-Record deleted successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

}
