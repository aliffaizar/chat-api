import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('createChat')
  async create(@MessageBody() data: { userId: string; avatar: string }) {
    const chat = await this.chatService.create(data.userId, data.avatar);
    this.server.emit('inviteAgent', {
      roomId: chat.roomId,
      status: 'pendding',
    });
    return chat;
  }

  @SubscribeMessage('findChats')
  findChats(@MessageBody() userID: string) {
    const chats = this.chatService.findChats(userID);
    this.server.emit(`chat-${userID}`, chats);
  }

  @SubscribeMessage('findChat')
  findChat(@MessageBody() roomId: string) {
    return this.chatService.findChat(roomId);
  }

  @SubscribeMessage('acceptInvitation')
  acceptInvitation(
    @MessageBody()
    data: {
      roomId: string;
      userId: string;
      status: 'accepted' | 'pendding';
    },
  ) {
    if (data.status === 'pendding') {
      return this.chatService.acceptInvitation(data.roomId, data.userId);
    }
    this.server.emit('inviteAgent', {
      roomId: data.roomId,
      status: 'accepted',
    });
  }

  @SubscribeMessage('sendMessage')
  async sendMessage(
    @MessageBody() data: { sender: string; roomId: string; content: string },
  ) {
    const chat = await this.chatService.sendMessage(
      data.sender,
      data.roomId,
      data.content,
    );
    this.server.emit(`messages-${data.roomId}`, chat.messages);
  }

  @SubscribeMessage('inviteProvider')
  async inviteAgent(@MessageBody() data: { roomId: string; userId: string }) {
    const chat = await this.chatService.invitation(data.roomId, data.userId);
    this.server.emit(`invitation-${data.userId}`, chat.roomId);
    return chat;
  }
}
