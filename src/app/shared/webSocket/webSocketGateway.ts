import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Notifications } from 'src/app/notifications/notification.entity';

@WebSocketGateway()
export class WebSocket {
  @WebSocketServer() server: Server;

  sendNotification(notification: Notifications) {
    // Broadcast notification to all connected WebSocket clients
    this.server.emit('notification', notification);
  }
}
