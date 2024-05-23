import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model, Types } from 'mongoose';

import { Allergy } from './allergy.entity';
import { CreateAllergyDto } from './dto/allergy.dto';
import { Medical } from '../suivi-medical/medical.entity';

@Injectable()
export class AllergyService {

    constructor(
        @InjectModel(Allergy.name) private allergyModel: Model<Allergy>,
        @InjectModel(Medical.name) private medicalModel: Model<Medical>,
    ) { }

    async create(createAllergyDto: CreateAllergyDto): Promise<Allergy> {
        const { name, severity, medicalId } = createAllergyDto;

        const newAllergy = new this.allergyModel({
            name,
            severity,
            medical: medicalId,
        });

        try {
            const allergy = await newAllergy.save();
            await this.medicalModel.findByIdAndUpdate(medicalId, { $push: { allergies: allergy._id } });
            return allergy;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async findById(id: string): Promise<Allergy> {
        try {
            const allergy = await this.allergyModel.findById(id).exec();
            if (!allergy) {
                throw new HttpException("Allergy not found", HttpStatus.BAD_REQUEST);
            }
            return allergy;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async findAll(): Promise<{ message: string, allergies: Allergy[] }> {
        try {
            const allergies = await this.allergyModel.find({})
                .populate('medical')
                .exec();
            return { message: 'Allergies retrieved successfully', allergies };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async update(id: string, updateAllergyDto: CreateAllergyDto): Promise<Allergy> {
        try {
            const updatedAllergy = await this.allergyModel.findByIdAndUpdate(id, updateAllergyDto, { new: true }).exec();
            if (!updatedAllergy) {
                throw new HttpException("Allergy not found", HttpStatus.BAD_REQUEST);
            }
            return updatedAllergy;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async delete(id: string): Promise<{ message: string }> {
        try {
            const allergy = await this.allergyModel.findById(id).exec();
            if (!allergy) {
                throw new HttpException("Allergy not found", HttpStatus.BAD_REQUEST);
            }

            await this.medicalModel.findByIdAndUpdate(allergy.medical, {
                $pull: { allergies: allergy._id },
            }).exec();
            const deleted = await this.allergyModel.findByIdAndDelete(id).exec();
            if (!deleted) {
                throw new HttpException("Allergy not found", HttpStatus.BAD_REQUEST);
            }
            return { message: 'Allergy deleted successfully' };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
