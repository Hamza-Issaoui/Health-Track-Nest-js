import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';

import { ActivityService } from './activity.service';
import { Activities } from './activity.entity';
import { CreateActivityDto } from './dto/create-activity.dto';

@Controller('Activities')
export class ActivitiesController {
  constructor(private readonly activityService: ActivityService) { }

  @Post()
  async createActivity(@Body() createmealDto: CreateActivityDto): Promise<Activities> {
    const { name, description } = createmealDto;
    return this.activityService.create(name, description);
  }

  @Get(':id')
  async findActivityById(@Param('id') id: string): Promise<Activities> {
    return this.activityService.findById(id);
  }

  @Get(':name')
  async findActivityByName(@Param('name') name: string): Promise<Activities> {
    return this.activityService.findByname(name);
  }

  @Get()
  async findAllActivities(): Promise<{ message: string, activity: Activities[] }> {
    return await this.activityService.findAll();
  }

  @Patch(':id')
  async updateActivity(
    @Param('id') id: string,
    @Body() updatenutrientDto: CreateActivityDto,
  ): Promise<Activities> {
    return this.activityService.update(id, updatenutrientDto);
  }

  @Delete(':id')
  deleteActivity(@Param('id') id: string) {
    return this.activityService.delete(id);
  }
}
