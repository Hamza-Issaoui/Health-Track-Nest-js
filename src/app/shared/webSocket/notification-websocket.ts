import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
} from '@nestjs/websockets';

import { Server } from 'socket.io';

@WebSocketGateway()
export class WebSocket {
  @WebSocketServer()
  server: Server;

  async emitter(event: string, data: any) {
    this.server.emit('notification', ' test data from back ');
  }

  sendNotification(message: any) {
    this.server.emit('notification', message);
  }

  @SubscribeMessage('notification')
  handleSomeEvent(@MessageBody() payload: any) {
    this.server.emit('notification', payload.message);
  }
}
