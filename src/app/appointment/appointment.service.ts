import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model, Types } from 'mongoose';

import { Appointments } from './appointment.entity';
import { CreateAppointDto } from './dto/create-appointment.dto';
import { Medical } from '../suivi-medical/medical.entity';

@Injectable()
export class AppointmentService {

    constructor(
        @InjectModel(Appointments.name) private appointModel: Model<Appointments>,
        @InjectModel(Medical.name) private medicalModel: Model<Medical>,
    ) { }

    async create(createAppointDto: CreateAppointDto): Promise<any> {
        const { date, description, doctor, medicalId } = createAppointDto;

        const newAppoint = new this.appointModel({
            date,
            doctor,
            description,
            medical: medicalId,
        });

        try {
            const appointment = await newAppoint.save();
            await this.medicalModel.findByIdAndUpdate(medicalId, { $push: { appointments: appointment } });
            return {
                status: HttpStatus.CREATED,
                msg: 'Medication Created Successfully!',
                appointment: appointment,
            };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async findByname(name: string): Promise<Appointments> {
        try {
            const appoint = await this.appointModel.findOne({ name }).exec();
            if (!appoint) {
                throw new HttpException('Appointment not found', HttpStatus.BAD_REQUEST);
            }
            return appoint;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async findById(id: string): Promise<Appointments> {
        try {
            const appoint = await this.appointModel.findById(id).exec();
            if (!appoint) {
                throw new HttpException('Appointment not found', HttpStatus.BAD_REQUEST);
            }
            return appoint;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async findAll(): Promise<{ message: string, appoints: Appointments[] }> {
        try {
            const appoints = await this.appointModel.find({})
                .populate('medical')
                .exec();
            return { message: 'Appointments retrieved successfully', appoints };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async update(id: string, updateAppointDto: CreateAppointDto): Promise<Appointments> {
        try {
            const updatedAppoint = await this.appointModel.findByIdAndUpdate(id, updateAppointDto, { new: true }).exec();
            if (!updatedAppoint) {
                throw new HttpException('Appointment not found', HttpStatus.BAD_REQUEST);
            }
            await this.medicalModel.findByIdAndUpdate(updatedAppoint.medical, {
                $set: { "appointments.$[elem]": updatedAppoint }
            }, {
                arrayFilters: [{ "elem._id": new Types.ObjectId(id) }]
            });
            return updatedAppoint;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async delete(id: string): Promise<{ message: string }> {
        try {
            const appoint = await this.appointModel.findById(id).exec();
            if (!appoint) {
                throw new HttpException("Appointment not found", HttpStatus.BAD_REQUEST);
            }
            await this.medicalModel.findByIdAndUpdate(appoint.medical, {
                $pull: { appointments: appoint },
            }).exec();
            const deleted = await this.appointModel.findByIdAndDelete(id).exec();
            if (!deleted) {
                throw new HttpException('Appointment not found', HttpStatus.BAD_REQUEST);
            }
            return { message: 'Appointment deleted successfully' };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
