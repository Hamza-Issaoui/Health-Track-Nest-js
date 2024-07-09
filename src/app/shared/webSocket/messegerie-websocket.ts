import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    MessageBody,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Logger } from '@nestjs/common';
  
  import { Server, Socket } from 'socket.io';
  import { EventEmitter } from 'events';
  
  @WebSocketGateway()
  export class MessagerieGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
  {
    @WebSocketServer() wss: Server;
    // server: Server;
    private logger: Logger = new Logger();
  
    constructor() {
      EventEmitter.defaultMaxListeners = 30; // or a higher value if needed
    }
    afterInit(server: Server) {
      this.logger.log('Messagerie Gateway Initialized!');
    }
  
    handleConnection(client: Socket, ...args: any[]) {
      this.logger.log('Client Msg Connected: ' + client.id);
    }
  
    handleDisconnect(client: any) {
      this.logger.log('Client Msg Disconnected: ' + client.id);
    }
  
    sendMessage(message: any) {

        console.log(message, ' message one ws');
        
      this.wss.emit('msgToClient', message);
    }
  
    sendMessageById(message: any) {
      this.wss.emit('msgByUserId', message);
    }
  
    updateChats(newChat: any) {
      this.wss.emit('chatsToClient', newChat);
    }
  
    @SubscribeMessage('messagerie')
    handleMsg(@MessageBody() payload: any) {
      this.wss.emit('msgToServer', payload.message);
    }
  }
  