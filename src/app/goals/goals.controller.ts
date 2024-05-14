// user.controller.ts

import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { CreateGoalDto } from './dto/create-goal.dto';
import { Goals } from './goals.entity';
import { GoalService } from './goals.service';

@Controller('goals')
export class GoalsController {
  constructor(private readonly goalService: GoalService) {}

  @Post()
  async createGoal(@Body() creategoalDto: CreateGoalDto): Promise<Goals> {
    const { name, description } = creategoalDto;
    return this.goalService.create(name, description);
  }

   @Get(':id') // Define the route parameter
  async findGoalById(@Param('id') id: string): Promise<Goals> {
    return this.goalService.findById(id);
  }
  
  @Get(':name') 
  async findGoalByName(@Param('name') name: string): Promise<Goals> {
    return this.goalService.findByname(name);
  }

  

  @Get()
  async findAllGoals(): Promise<{ message: string, goals: Goals[] }> {
    return await this.goalService.findAll();
  }

  @Patch(':id')
  async updateGoal(
    @Param('id') id: string,
    @Body() updateGoalDto: CreateGoalDto,
  ): Promise<Goals> {
    return this.goalService.update(id, updateGoalDto);
  }


  @Delete(':id')
  deleteGoal(@Param('id') id: string) {
    return this.goalService.delete(id);
  } 
}
