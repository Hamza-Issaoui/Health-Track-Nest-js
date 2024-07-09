import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';


import { WebSocket } from '../shared/webSocket/notification-websocket';
import { Messages } from './messagerie.entity';
import { CreateMessageDto } from './dto/createMessage.dto';
import { Chat } from '../chat/chat.entity';
import { MessagerieGateway } from '../shared/webSocket/messegerie-websocket';
import { ChatModule } from '../chat/chat.module';

@Injectable()
export class MessageService {
    constructor(
        @InjectModel(Messages.name) private messageModel: Model<Messages>,
        @InjectModel(Chat.name) private chatModel: Model<Chat>,
        private readonly webSocket: WebSocket,
        private _messagerieGateway: MessagerieGateway
    ) { }

    async createMessage(createMessageDto: CreateMessageDto): Promise<any> {
        const { value, chatId, contactId, isMine } = createMessageDto;
        try {
            const newMessage = new this.messageModel({
                value,
                chatId: chatId,
                contactId: contactId,
                isMine: isMine,
            });
            const savedMessage = await newMessage.save();
            await this.chatModel.findByIdAndUpdate(chatId, {
                $push: { messages: savedMessage },

            });
            const messages = await this.messageModel.find().exec();

            // Emit message event to WebSocket clients
            this._messagerieGateway.sendMessage(
                await this.chatModel.findById({_id: savedMessage.chatId}),
              );
              this._messagerieGateway.sendMessageById(await this.findAll(contactId));
          
            console.log("Message sent to WebSocket clients");

            return {
                status: HttpStatus.CREATED,
                msg: "Message Created Successfully!",
                message: savedMessage
            };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }


    async findAll(id): Promise<Messages[]> {
        const chats = await this.chatModel.find({ contactId: id })
          .populate({
            path: 'messages',
          })
          .exec();
      console.log(chats, ' chats aze aze ');
      
        const messages = chats.flatMap((chat) => chat.messages);
      
        const returnedMsg = messages.filter((message) => !message.seen);
        console.log( returnedMsg, ' gsgzg');
        return returnedMsg;
      }


    async findByMessageName(name: string): Promise<Messages> {
        try {
            const message = await this.messageModel.findOne({ name }).exec();
            if (!message) {
                throw new HttpException("Message not found", HttpStatus.BAD_REQUEST);
            }
            return message;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async findById(id: string): Promise<Messages> {
        try {
            const message = await this.messageModel.findById(id).exec();
            if (!message) {
                throw new HttpException("Message not found", HttpStatus.BAD_REQUEST);
            }
            return message;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async findAllMessages(): Promise<Messages[]> {
        try {
            return await this.messageModel.find().exec();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async updateMessage(id: string, updateMessageDto: CreateMessageDto): Promise<Messages> {
        try {
            const updatedMessage = await this.messageModel.findByIdAndUpdate(id, updateMessageDto, { new: true }).exec();
            if (!updatedMessage) {
                throw new HttpException("Message not found", HttpStatus.BAD_REQUEST);
            }
            return updatedMessage;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async deleteMessage(id: string): Promise<{ message: string }> {
        try {
            const deletedMessage = await this.messageModel.findByIdAndDelete(id).exec();
            if (!deletedMessage) {
                throw new HttpException("Message not found", HttpStatus.BAD_REQUEST);
            }
            return { message: 'Message deleted successfully' };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Mark all as read
     * @returns 
     */
    async markAllAsRead(): Promise<any> {
        const messages = await this.messageModel.find().exec();

        for (const message of messages) {
            message.seen = true;
            await message.save();
        }

        return messages;
    }



}
