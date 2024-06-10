import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model, Types } from 'mongoose';

import { Symptom } from './symptom.entity';
import { CreateSymptomDto } from './dto/symptom.dto';
import { Medical } from '../suivi-medical/medical.entity';

@Injectable()
export class SymptomService {

    constructor(
        @InjectModel(Symptom.name) private symptomModel: Model<Symptom>,
        @InjectModel(Medical.name) private medicalModel: Model<Medical>,

    ) { }

    async create(createSymptomDto: CreateSymptomDto): Promise<Symptom> {
        const { name, description, date, medicalId } = createSymptomDto;

        const newSymptom = new this.symptomModel({
            name,
            description,
            date,
            medical: medicalId,
        });

        try {
            const symptom = await newSymptom.save();
            await this.medicalModel.findByIdAndUpdate(medicalId, { $push: { symptoms: symptom } });
            return symptom;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async findById(id: string): Promise<Symptom> {
        try {
            const symptom = await this.symptomModel.findById(id).exec();
            if (!symptom) {
                throw new HttpException("Symptom not found", HttpStatus.BAD_REQUEST);
            }
            return symptom;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async findAll(): Promise<{ message: string, symptoms: Symptom[] }> {
        try {
            const symptoms = await this.symptomModel.find({})
                .populate('medical')
                .exec();
            return { message: 'Symptoms retrieved successfully', symptoms };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async update(id: string, updateSymptomDto: CreateSymptomDto): Promise<Symptom> {
        try {
            const update = await this.symptomModel.findByIdAndUpdate(id, updateSymptomDto, { new: true }).exec();
            if (!update) {
                throw new HttpException("Symptom not found", HttpStatus.BAD_REQUEST);
            }
            return update;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async delete(id: string): Promise<{ message: string }> {
        try {
            const symptom = await this.symptomModel.findById(id).exec();
            if (!symptom) {
                throw new HttpException("Symptom not found", HttpStatus.BAD_REQUEST);
            }
            await this.medicalModel.findByIdAndUpdate(symptom.medical, {
                $pull: { symptoms: symptom._id },
            }).exec();
            const deleted = await this.symptomModel.findByIdAndDelete(id).exec();
            if (!deleted) {
                throw new HttpException("Symptom not found", HttpStatus.BAD_REQUEST);
            }
            return { message: 'Symptom deleted successfully' };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

}
