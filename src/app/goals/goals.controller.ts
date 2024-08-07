// user.controller.ts

import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';

import { Goals } from './goals.entity';
import { GoalService } from './goals.service';
import { CreateGoalDto } from './dto/create-goal.dto';

@Controller('goals')
export class GoalsController {
  constructor(private readonly goalService: GoalService) { }

  @Post()
  async createGoal(@Body() creategoalDto: CreateGoalDto): Promise<Goals> {
    return this.goalService.create(creategoalDto);
  }

  @Get(':id')
  async findGoalById(@Param('id') id: string): Promise<Goals> {
    return this.goalService.findById(id);
  }

  @Get('user/:id')
  async findGoalByUser(@Param('id') id: string): Promise<Goals> {
    return this.goalService.findByUser(id);
  }

  @Get('users/:id')
  async findAllGoalByUser(@Param('id') id: string): Promise<Goals[]> {
    return this.goalService.findAllByUser(id);
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
