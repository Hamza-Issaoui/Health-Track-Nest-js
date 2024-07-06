import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { diskStorage } from 'multer';

import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { Users } from './user.entity';
import { LocalAuthGuard } from '../Auth/local-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        return cb(null, `${randomName}${Date.now()}${file.originalname}`);
      },
    }),
  }))

  async createUser(@Body() createUserDto: CreateUserDto, @UploadedFile() file): Promise<Users> {
    return this.userService.createUser(createUserDto, file);
  }

  @Get(':id') // Define the route parameter
  async findUserById(@Param('id') id: string): Promise<Users> {
    return this.userService.findById(id);
  }

  @Get(':name')
  async findUserByName(@Param('name') name: string): Promise<Users> {
    return this.userService.findByUsername(name);
  }

  @Get(':email')
  async findUserByEmail(@Param('email') email: string): Promise<Users> {
    return this.userService.findByEmail(email);
  }

  // @UseGuards(LocalAuthGuard)
  @Get()
  async findAllUsers(): Promise<{ message: string, users: Users[] }> {
    return await this.userService.findAllUsers();
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: CreateUserDto,
  ): Promise<Users> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  //@UseGuards(LocalAuthGuard)
  @Get(':id/profile')
  async getProfile(@Param('id') userId: string): Promise<Users> {
    return this.userService.getProfile(userId);
  }

  @Patch(':id/profile')
  async updateProfile(@Param('id') userId: string, @Body() updateUserDto: CreateUserDto): Promise<Users> {
    return this.userService.updateProfile(userId, updateUserDto);
  }
}
