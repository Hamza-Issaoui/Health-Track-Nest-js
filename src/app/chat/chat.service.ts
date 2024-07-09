// user.service.ts

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';


import { Users } from '../users/user.entity';
import { Nutrients } from '../nutrient/nutrient.entity';
import { Chat } from './chat.entity';
import { CreateChatDto } from './dto/create-chat.dto';
import { MessagerieGateway } from '../shared/webSocket/messegerie-websocket';

@Injectable()
export class ChatService {
    constructor(
        @InjectModel(Chat.name) private chatModel: Model<Chat>,
        @InjectModel(Users.name) private userModel: Model<Users>,
        private _messagerieGateway: MessagerieGateway,
    ) { }

    async create(createChatDto: CreateChatDto): Promise<any> {
        const { lastMessage, lastMessageAt, unreadCount, contactId, idReceiver, messages } = createChatDto;

        // Create new chats object
        const newChat = new this.chatModel({
            lastMessage,
            lastMessageAt,
            unreadCount,
            messages,
            contactId: contactId,
            idReceiver: idReceiver

        });

        try {
            const chat = await newChat.save()
            console.log("chats", chat);

            await this.userModel.findByIdAndUpdate(contactId, {
                $push: { chats: chat }
            })

            this._messagerieGateway.updateChats(
                await this.findByUserId(chat.contactId),
              );

              
            console.log("nouveau chat", chat);
            return {
                status: HttpStatus.CREATED,
                msg: 'Chat Created Successfully!',
                chat: chat,
            };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async findByUserId(id): Promise<Chat[]> {
        const chats = await this.chatModel.find({
            $or: [
                { contactId: id },
                { idReceiver: id }
            ]
        })
            .populate('messages')
            .populate('contactId')
            .populate('idReceiver')
            .exec();
        return chats;
    }


    async findById(id: string): Promise<Chat> {
        try {
            const chat = await this.chatModel.findById(id).populate('contactId')
                .exec();
            if (!chat) {
                throw new HttpException("Chat not found", HttpStatus.BAD_REQUEST);
            }
            return chat;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async findChatByUserAndDate(userId: string, date: Date): Promise<Chat[]> {
        try {
            // Convert the date to the start and end of the day
            const startOfDay = new Date(date);
            startOfDay.setUTCHours(0, 0, 0, 0);

            const endOfDay = new Date(date);
            endOfDay.setUTCHours(23, 59, 59, 999);

            // Fetch chats that match the userId and fall within the start and end of the given date
            const chats = await this.chatModel.find({
                user: userId,
                date: { $gte: startOfDay, $lte: endOfDay }
            }).populate('user').exec();

            if (!chats || chats.length === 0) {
                throw new HttpException('No Chats found for the given date', HttpStatus.NOT_FOUND);
            }

            return chats;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async findAll(): Promise<{ message: string, chats: Chat[] }> {
        try {
            const chats = await this.chatModel.find({})
                .populate('contactId')
                .populate('messages')
                .populate('idReceiver')
                .exec();
            return { message: 'Chats retrieved successfully', chats };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async update(id: string, updateChatDto: CreateChatDto): Promise<Chat> {
        try {
            const updatedChat = await this.chatModel.findByIdAndUpdate(id, updateChatDto, { new: true }).exec();
            if (!updatedChat) {
                throw new HttpException("Chat not found", HttpStatus.BAD_REQUEST);
            }
            return updatedChat;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async delete(id: string): Promise<{ message: string }> {
        try {
            const chat = await this.chatModel.findById(id).exec();
            if (!chat) {
                throw new HttpException("Chat not found", HttpStatus.BAD_REQUEST);
            }
            await this.userModel.findByIdAndUpdate(chat.contactId, {
                $pull: { chats: chat },
            }).exec();
            const deleted = await this.chatModel.findByIdAndDelete(id).exec();
            if (!deleted) {
                throw new HttpException('Chat not found', HttpStatus.BAD_REQUEST);
            }
            return { message: 'Chat deleted successfully' };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

}
