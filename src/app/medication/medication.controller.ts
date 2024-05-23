import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { Medications } from './medication.entity';
import { MedicationService } from './medication.service';
import { CreateMedicationDto } from './dto/medication.dto';

@Controller('medication')
export class MedicationController {

    constructor(private readonly medicationService: MedicationService) { }

    @Post()
    async createMedication(@Body() createMedicationDto: CreateMedicationDto): Promise<Medications> {
        return this.medicationService.create(createMedicationDto);
    }

    @Get(':id')
    async findMedicationById(@Param('id') id: string): Promise<Medications> {
        return this.medicationService.findById(id);
    }

    @Get()
    async findAllMedications(): Promise<{ message: string, medications: Medications[] }> {
        return await this.medicationService.findAll();
    }

    @Patch(':id')
    async updateMedication(
        @Param('id') id: string,
        @Body() updateMedicationDto: CreateMedicationDto,
    ): Promise<Medications> {
        return this.medicationService.update(id, updateMedicationDto);
    }

    @Delete(':id')
    deleteMedication(@Param('id') id: string) {
        return this.medicationService.delete(id);
    }
}
