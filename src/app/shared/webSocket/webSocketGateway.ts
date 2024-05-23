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

  // sendMessage(message: any) {
  //   this.server.emit('msgToPartner', message);
  // }

  // @SubscribeMessage('messagerie')
  // handleMsg(@MessageBody() payload: any) {
  //   this.server.emit('msgToServer', payload.message);
  // }

  @SubscribeMessage('notification')
  handleSomeEvent(@MessageBody() payload: any) {
    this.server.emit('notification', payload.message);
  }
}





// import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
// import { Server } from 'socket.io';
// import { Notifications } from 'src/app/notifications/notification.entity';

// @WebSocketGateway()
// export class WebSocket {
//   @WebSocketServer() server: Server;

//   handleConnection(_client) {
//     console.log('WebSocket client connected');
//   }

//   handleDisconnect(_client) {
//     console.log('WebSocket client disconnected');
//   }


//   sendNotification(notification: Notifications) {
//     // Broadcast notification to all connected WebSocket clients
//     this.server.emit('notification', notification);
//   }
// }
