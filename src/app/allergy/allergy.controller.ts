import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { AllergyService } from './allergy.service';
import { Allergy } from './allergy.entity';
import { CreateAllergyDto } from './dto/allergy.dto';

@Controller('allergy')
export class AllergyController {

    constructor(private readonly allergyService: AllergyService) { }

    @Post()
    async createNutrient(@Body() createAllergyDto: CreateAllergyDto): Promise<Allergy> {
        return this.allergyService.create(createAllergyDto);
    }

    @Get(':id')
    async findAllergyById(@Param('id') id: string): Promise<Allergy> {
        return this.allergyService.findById(id);
    }

    @Get()
    async findAllAllergies(): Promise<{ message: string, allergies: Allergy[] }> {
        return await this.allergyService.findAll();
    }

    @Patch(':id')
    async updateAllergy(
        @Param('id') id: string,
        @Body() updateAllergyDto: CreateAllergyDto,
    ): Promise<Allergy> {
        return this.allergyService.update(id, updateAllergyDto);
    }

    @Delete(':id')
    deleteAllergy(@Param('id') id: string) {
        return this.allergyService.delete(id);
    }
}
