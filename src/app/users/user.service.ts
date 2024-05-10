// user.service.ts

import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UserService {
  constructor(@InjectModel(Users.name) private userModel: Model<Users>) {}

  async createUser(createUserDto: CreateUserDto): Promise<Users> {
    try {
      const { firstname, lastname, phone, role, email, password } = createUserDto;

      const existingUser = await this.userModel.findOne({ email }).exec();
      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }
  
      const newUser = new this.userModel({ firstname, lastname, phone, role, email, password });
      return await newUser.save();
    } catch (error) {
      console.error('Failed to create user:', error.message);
      throw new ConflictException('Failed to create user');
    }
  }

  async findByUsername(name: string): Promise<Users> {
    try {
      const user = await this.userModel.findOne({ name }).exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new Error('Failed to find user by name');
    }
  }

  async findById(id: string): Promise<Users> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new NotFoundException('Failed action');
    }
  }

  async findByEmail(email: string): Promise<Users> {
    try {
      const user = await this.userModel.findOne({ email }).exec();
      if (!user) {
        throw new NotFoundException('Email not found'); // Customized message
      }
      return user;
    } catch (error) {
      console.error('Failed to find user by email:', error.message);
      throw new NotFoundException('Email not found'); // Customized message
    }
  }

  async findAllUsers(): Promise<{ message: string, users: Users[] }> {
    try {
      const users = await this.userModel.find().exec();
      return { message: 'Users retrieved successfully', users };
    } catch (error) {
      throw new NotFoundException('Failed to find users');
    }
  }

  async updateUser(id: string, updateUserDto: CreateUserDto): Promise<Users> {
    try {
      const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
      if (!updatedUser) {
        throw new NotFoundException('User not found');
      }
      return updatedUser;
    } catch (error) {
      throw new Error('Failed to update user');
    }
  }

  async deleteUser(id: string): Promise<{ message: string }> {
    try {
      const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
      if (!deletedUser) {
        throw new NotFoundException('User not found');
      }
      return { message: 'User deleted successfully' };
    } catch (error) {
      throw new Error('Failed to delete user');
    }
  }

  async getProfile(userId: string): Promise<Users> {
    try {
      const user = await this.findById(userId);
      // Ne renvoie pas le mot de passe dans le profil
      const { password, ...profile } = user.toObject();
      return profile;
    } catch (error) {
      throw new Error('Failed to get user profile');
    }
  }
  
  async updateProfile(userId: string, updateUserDto: CreateUserDto): Promise<Users> {
    try {
      const updatedUser = await this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: true }).exec();
      if (!updatedUser) {
        throw new NotFoundException('User not found');
      }
      return updatedUser;
    } catch (error) {
      throw new Error('Failed to update user profile');
    }
  }



  async updateResetToken(userId: string, resetToken: string): Promise<void> {
    try {
      await this.userModel.findByIdAndUpdate(userId, { resetToken }).exec();
    } catch (error) {
      throw new Error('Failed to update reset token');
    }
  }

  async findByResetToken(token: string): Promise<Users> {
    try {
      const user = await this.userModel.findOne({ resetToken: token }).exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new Error('Failed to find user by reset token');
    }
  }

  async updatePassword(userId: string, newPassword: string): Promise<void> {
    try {
      const hashedPassword = bcrypt.hashSync(newPassword, 10);
      await this.userModel.findByIdAndUpdate(userId, { password: hashedPassword }).exec();
    } catch (error) {
      throw new Error('Failed to update password');
    }
  }

  async clearResetToken(userId: string): Promise<void> {
    try {
      await this.userModel.findByIdAndUpdate(userId, { resetToken: null }).exec();
    } catch (error) {
      throw new Error('Failed to clear reset token');
    }
  }

  async updateEmailVerificationStatus(userId: string, verified: boolean): Promise<void> {
    try {
      await this.userModel.findByIdAndUpdate(userId, { emailVerified: verified }).exec();
    } catch (error) {
      throw new Error('Failed to update email verification status');
    }
  }
}
