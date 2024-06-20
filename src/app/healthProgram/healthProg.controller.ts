import { Controller, Post, Body, Get, Param, Patch, Delete, HttpException, HttpStatus } from '@nestjs/common';


import { HealthProgramService } from './healthProg.service';
import { HealthPrograms } from './healthProg.entity';
import { CreateProgramDto } from './dto/createProgram.dto';

@Controller('programs')
export class HealthProgramController {
  constructor(private readonly programService: HealthProgramService) { }

  @Post()
  async createProgram(@Body() createProgramDto: CreateProgramDto): Promise<HealthPrograms> {
    return this.programService.create(createProgramDto);
  }

  @Get(':id')
  async findProgramById(@Param('id') id: string): Promise<HealthPrograms> {
    return this.programService.findById(id);
  }

  @Get('user/:id')
  async findProgramByName(@Param('id') id: string): Promise<HealthPrograms> {
    return this.programService.findByUserId(id);
  }

  @Get('date/:date')
  async findProgramByDate(@Param('date') date: string): Promise<HealthPrograms[]> {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      throw new HttpException('Invalid date format', HttpStatus.BAD_REQUEST);
    }
    return this.programService.findMealByDate(parsedDate);
  }

  @Get()
  async findAllPrograms(): Promise<{ message: string, programs: HealthPrograms[] }> {
    return await this.programService.findAll();
  }

  @Patch(':id')
  async updateProgram(
    @Param('id') id: string,
    @Body() updateProgramDto: CreateProgramDto,
  ): Promise<HealthPrograms> {
    return this.programService.update(id, updateProgramDto);
  }

  @Delete(':id')
  deleteProgram(@Param('id') id: string) {
    return this.programService.delete(id);
  }
}
