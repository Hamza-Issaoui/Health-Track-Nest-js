import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { AppointmentService } from './appointment.service';
import { Appointments } from './appointment.entity';
import { CreateAppointDto } from './dto/create-appointment.dto';

@Controller('appointment')
export class AppointmentController {

    constructor(private readonly appointService: AppointmentService) { }

    @Post()
    async createNutrient(@Body() createAppointDto: CreateAppointDto): Promise<Appointments> {
        return this.appointService.create(createAppointDto);
    }

    @Get(':id')
    async findAppointmentById(@Param('id') id: string): Promise<Appointments> {
        return this.appointService.findById(id);
    }

    @Get()
    async findAllAppointments(): Promise<{ message: string, appoints: Appointments[] }> {
        return await this.appointService.findAll();
    }

    @Patch(':id')
    async updateAppointment(
        @Param('id') id: string,
        @Body() updateAppointDto: CreateAppointDto,
    ): Promise<Appointments> {
        return this.appointService.update(id, updateAppointDto);
    }

    @Delete(':id')
    deleteAppointment(@Param('id') id: string) {
        return this.appointService.delete(id);
    }
}
