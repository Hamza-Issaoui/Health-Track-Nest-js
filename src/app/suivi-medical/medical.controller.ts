// user.controller.ts

import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { MedicalService } from './medical.service';
import { Medical } from './medical.entity';
import { CreateMedicalDto } from './dto/create-medical.dto';


@Controller('medical')
export class MedicalController {
  constructor(private readonly medicalervice: MedicalService) {}

  @Post()
  async createMedical(@Body() creategoalDto: CreateMedicalDto): Promise<Medical> {
    const { name, description } = creategoalDto;
    return this.medicalervice.create(name, description);
  }

   @Get(':id') // Define the route parameter
  async findMedicalById(@Param('id') id: string): Promise<Medical> {
    return this.medicalervice.findById(id);
  }
  
  @Get(':name') 
  async findMedicalByName(@Param('name') name: string): Promise<Medical> {
    return this.medicalervice.findByname(name);
  }

  @Get()
  async findAllGoals(): Promise<{ message: string, medical: Medical[] }> {
    return await this.medicalervice.findAll();
  }

  @Patch(':id')
  async updateGoal(
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
