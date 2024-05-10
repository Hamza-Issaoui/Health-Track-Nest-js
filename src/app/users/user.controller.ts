// user.controller.ts

import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { Users } from './user.entity';
import { LocalAuthGuard } from '../Auth/local-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<Users> {
   // const { name, email, password } = createUserDto;
    return this.userService.createUser(createUserDto);
  }

  @Get('id/:id') // Define the route parameter
  async findUserById(@Param('id') id: string): Promise<Users> {
    return this.userService.findById(id);
  }
  
  @Get('name/:name') 
  async findUserByName(@Param('name') name: string): Promise<Users> {
    return this.userService.findByUsername(name);
  }

  @Get('email/:email') 
  async findUserByEmail(@Param('email') email: string): Promise<Users> {
    return this.userService.findByEmail(email);
  }

  @Get('getAll')
  async findAllUsers(): Promise<{ message: string, users: Users[] }> {
    return await this.userService.findAllUsers();
  }

  @Patch('update/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: CreateUserDto,
  ): Promise<Users> {
    return this.userService.updateUser(id, updateUserDto);
  }


  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

 // @UseGuards(LocalAuthGuard)
  @Get(':id/profile')
async getProfile(@Param('id') userId: string): Promise<Users> {
  return this.userService.getProfile(userId);
  }

@Patch(':id/profile')
async updateProfile(@Param('id') userId: string, @Body() updateUserDto: CreateUserDto): Promise<Users> {
  return this.userService.updateProfile(userId, updateUserDto);
  }
}
