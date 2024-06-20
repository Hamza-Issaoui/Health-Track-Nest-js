// user.service.ts

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Users } from '../users/user.entity';
import { HealthPrograms } from './healthProg.entity';
import { CreateProgramDto } from './dto/createProgram.dto';

@Injectable()
export class HealthProgramService {
  constructor(
    @InjectModel(HealthPrograms.name) private programModel: Model<HealthPrograms>,
    @InjectModel(Users.name) private userModel: Model<Users>,
  ) { }

 async create(createProgDto: CreateProgramDto): Promise<any> {
  const { name, description, duration, startDate, endDate, userId } = createProgDto;

  const newMeal = new this.programModel({
    name,
    description,
    duration,
    startDate,
    endDate ,
    user: userId
  });

  try {
    const program = (await newMeal.save())
    console.log("program", program);
    
    await this.userModel.findByIdAndUpdate(userId, {
      $push: { healthPrograms: program }
    })

    return {
        status: HttpStatus.CREATED,
        msg: 'Health program Created Successfully!',
        symptom: program,
    };
  } catch (error) {
    throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  }
}

  async findByUserId(id: string): Promise<HealthPrograms> {
    try {
      const program = await this.programModel.findOne({ user: id }).populate('user').exec();
      if (!program) {
        throw new HttpException("Health program not found", HttpStatus.BAD_REQUEST);
      }
      return program;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findById(id: string): Promise<HealthPrograms> {
    try {
      const program = await this.programModel.findById(id).exec();
      if (!program) {
        throw new HttpException("Health program not found", HttpStatus.BAD_REQUEST);
      }
      return program;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findMealByDate(date: Date): Promise<HealthPrograms[]> {
    try {
      const programs = await this.programModel.find({ date }).populate('user').exec();
      if (!programs || programs.length === 0) {
        throw new HttpException("No Health program found for the given date", HttpStatus.NOT_FOUND);
      }
      return programs;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<{ message: string, programs: HealthPrograms[] }> {
    try {
      const programs = await this.programModel.find({})
      .populate('user')
        .exec();
      return { message: 'Health programs retrieved successfully', programs };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateprogramDto: CreateProgramDto): Promise<HealthPrograms> {
    try {
      const updatedProgram = await this.programModel.findByIdAndUpdate(id, updateprogramDto, { new: true }).exec();
      if (!updatedProgram) {
        throw new HttpException("Health program not found", HttpStatus.BAD_REQUEST);
      }
      return updatedProgram;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string): Promise<{ message: string }> {
    try {
        const program = await this.programModel.findById(id).exec();
        if (!program) {
            throw new HttpException("Health program not found", HttpStatus.BAD_REQUEST);
        }
        await this.userModel.findByIdAndUpdate(program.user, {
            $pull: { meals: program },
        }).exec();
        const deleted = await this.programModel.findByIdAndDelete(id).exec();
        if (!deleted) {
            throw new HttpException('Health program not found', HttpStatus.BAD_REQUEST);
        }
        return { message: 'Health program deleted successfully' };
    } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
}

}
