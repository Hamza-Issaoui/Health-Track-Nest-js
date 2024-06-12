import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';

import { MedicalService } from './medical.service';
import { Medical } from './medical.entity';
import { CreateMedicalDto } from './dto/create-medical.dto';

@Controller('medical')
export class MedicalController {
  constructor(private readonly medicalervice: MedicalService) { }

  @Post()
  async createMedical(@Body() createMedicalDto: CreateMedicalDto): Promise<Medical> {
    return this.medicalervice.create(createMedicalDto);
  }

  @Get(':id')
  async findMedicalById(@Param('id') id: string): Promise<Medical> {
    return this.medicalervice.findById(id);
  }

  /* a faire */
  @Get('user/:name')
  async findMedicalByName(@Param('name') name: string): Promise<Medical> {
    return this.medicalervice.findByname(name);
  }

  @Get()
  async findAllMedicals(): Promise<{ message: string, medical: Medical[] }> {
    return await this.medicalervice.findAll();
  }

  @Patch(':id')
  async updateMedical(
    @Param('id') id: string,
    @Body() updateMedicalDto: CreateMedicalDto,
  ): Promise<Medical> {
    return this.medicalervice.update(id, updateMedicalDto);
  }

  @Delete(':id')
  deleteMedical(@Param('id') id: string) {
    return this.medicalervice.delete(id);
  }
}
