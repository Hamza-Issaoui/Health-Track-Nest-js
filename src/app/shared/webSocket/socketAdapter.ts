import * as https from 'https';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server } from 'socket.io';

export class ExtendedSocketIoAdapter extends IoAdapter {
  protected ioServer: Server;

  constructor(protected server: https.Server) {
    super();

    const options = {
      cors: {
        origin: true,
        methods: ['GET', 'POST'],
        credentials: true,
      },
    };

    this.ioServer = new Server(server, options);
  }

  create(port: number) {
    return this.ioServer;
  }}