import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { CreateMedicationDto } from './dto/medication.dto';
import { Medications } from './medication.entity';
import { Medical } from '../suivi-medical/medical.entity';

@Injectable()
export class MedicationService {

    constructor(
        @InjectModel(Medications.name) private medicationModel: Model<Medications>,
        @InjectModel(Medical.name) private medicalModel: Model<Medical>,
    ) { }

    async create(createMedicationDto: CreateMedicationDto): Promise<Medications> {
        const { name, dosage, frequency, medicalId } = createMedicationDto;

        const newMedication = new this.medicationModel({
            name,
            dosage,
            frequency,
            medical: medicalId,
        });

        try {
            const medication = await newMedication.save();
            await this.medicalModel.findByIdAndUpdate(medicalId, { $push: { medications: medication } });
            return medication;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async findById(id: string): Promise<Medications> {
        try {
            const medication = await this.medicationModel.findById(id).exec();
            if (!medication) {
                throw new HttpException("Medication not found", HttpStatus.BAD_REQUEST);
            }
            return medication;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async findAll(): Promise<{ message: string, medications: Medications[] }> {
        try {
            const medications = await this.medicationModel.find({})
                .populate('medical')
                .exec();
            return { message: 'Medications retrieved successfully', medications };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async update(id: string, updatemedicationDto: CreateMedicationDto): Promise<Medications> {
        try {
            const updatedMedication = await this.medicationModel.findByIdAndUpdate(id, updatemedicationDto, { new: true }).exec();
            if (!updatedMedication) {
                throw new HttpException("Medication not found", HttpStatus.BAD_REQUEST);
            }
            return updatedMedication;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async delete(id: string): Promise<{ message: string }> {
        try {
            const medical = await this.medicationModel.findById(id).exec();
            if (!medical) {
                throw new HttpException("Medication not found", HttpStatus.BAD_REQUEST);
            }
            await this.medicalModel.findByIdAndUpdate(medical.medical, {
                $pull: { medications: medical._id },
            }).exec();
            const deleted = await this.medicationModel.findByIdAndDelete(id).exec();
            if (!deleted) {
                throw new HttpException("Medication not found", HttpStatus.BAD_REQUEST);
            }
            return { message: 'Medication deleted successfully' };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

}
