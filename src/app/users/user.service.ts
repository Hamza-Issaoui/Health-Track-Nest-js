import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { Users } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UploadFileService } from '../shared/upload-file/upload-file.service';


@Injectable()
export class UserService {
  constructor(@InjectModel('Users')
  private readonly userModel: Model<Users>,
    private readonly fileUploadService: UploadFileService
  ) { }

  async createUser(createUserDto: CreateUserDto, file): Promise<Users> {
    try {
      const { firstname, lastname, phone, role, email, password } = createUserDto;
      let profilePicture = null;

      if (file) {
        // Upload the file and get the file path
        profilePicture = this.fileUploadService.uploadFile(file);
      }

      const existingUser = await this.userModel.findOne({ email }).exec();
      if (existingUser) {
        throw new HttpException("User with this email already exists", HttpStatus.BAD_REQUEST);
      }

      const newUser = new this.userModel({ firstname, lastname, phone, role, email, password, profilePicture });
      return await newUser.save();
    } catch (error) {
      console.error('Failed to create user:', error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findByUsername(name: string): Promise<Users> {
    try {
      const user = await this.userModel.findOne({ name }).exec();
      if (!user) {
        throw new HttpException("User not found", HttpStatus.BAD_REQUEST);
      }
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findById(id: string): Promise<Users> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new HttpException("User not found", HttpStatus.BAD_REQUEST);
      }
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findByEmail(email: string): Promise<Users> {
    try {
      const user = await this.userModel.findOne({ email }).exec();
      if (!user) {
        throw new HttpException("Email not found", HttpStatus.BAD_REQUEST);
      }
      return user;
    } catch (error) {
      console.error('Failed to find user by email:', error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAllUsers(): Promise<Users[]> {
    try {
      const users = await this.userModel.find().populate('meals').populate('chats').exec();
      return users ;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateUser(id: string, updateUserDto: CreateUserDto): Promise<Users> {
    try {
      const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
      if (!updatedUser) {
        throw new HttpException("User not found", HttpStatus.BAD_REQUEST);
      }
      return updatedUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteUser(id: string): Promise<{ message: string }> {
    try {
      const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
      if (!deletedUser) {
        throw new HttpException("User not found", HttpStatus.BAD_REQUEST);
      }
      return { message: 'User deleted successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getProfile(userId: string): Promise<Users> {
    try {
      const user = await this.findById(userId);
      // Ne renvoie pas le mot de passe dans le profil
      const { password, ...profile } = user.toObject();
      return profile;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateProfile(userId: string, updateUserDto: CreateUserDto): Promise<Users> {
    try {
      const updatedUser = await this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: true }).exec();
      if (!updatedUser) {
        throw new HttpException("User not found", HttpStatus.BAD_REQUEST);
      }
      return updatedUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateResetToken(userId: string, resetToken: string): Promise<void> {
    try {
      await this.userModel.findByIdAndUpdate(userId, { resetToken }).exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findByResetToken(token: string): Promise<Users> {
    try {
      const user = await this.userModel.findOne({ resetToken: token }).exec();
      if (!user) {
        throw new HttpException("User not found", HttpStatus.BAD_REQUEST);
      }
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updatePassword(userId: string, newPassword: string): Promise<void> {
    try {
      const hashedPassword = bcrypt.hashSync(newPassword, 10);
      await this.userModel.findByIdAndUpdate(userId, { password: hashedPassword }).exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async clearResetToken(userId: string): Promise<void> {
    try {
      await this.userModel.findByIdAndUpdate(userId, { resetToken: null }).exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateEmailVerificationStatus(userId: string, verified: boolean): Promise<void> {
    try {
      await this.userModel.findByIdAndUpdate(userId, { emailVerified: verified }).exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
