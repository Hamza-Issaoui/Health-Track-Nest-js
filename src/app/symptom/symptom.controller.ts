import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { SymptomService } from './symptom.service';
import { CreateSymptomDto } from './dto/symptom.dto';
import { Symptom } from './symptom.entity';

@Controller('symptom')
export class SymptomController {

  constructor(private readonly symptomService: SymptomService) { }

  @Post()
  async createSymptom(@Body() createSymptomDto: CreateSymptomDto): Promise<Symptom> {
    return this.symptomService.create(createSymptomDto);
  }

  @Get(':id')
  async findSymptomById(@Param('id') id: string): Promise<Symptom> {
    return this.symptomService.findById(id);
  }

  @Get()
  async findAllSymptoms(): Promise<{ message: string, symptoms: Symptom[] }> {
    return await this.symptomService.findAll();
  }

  @Patch(':id')
  async updateSymptom(
    @Param('id') id: string,
    @Body() updateSymptomDto: CreateSymptomDto,
  ): Promise<Symptom> {
    return this.symptomService.update(id, updateSymptomDto);
  }

  @Delete(':id')
  deleteSymptom(@Param('id') id: string) {
    return this.symptomService.delete(id);
  }
}
