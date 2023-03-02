import { Injectable } from '@nestjs/common';

export interface Message {
  sender: string;
  content: string;
}

export interface Chat {
  roomId: string;
  members: string[];
  messages: Message[];
}

@Injectable()
export class ChatService {
  private readonly chats = [];

  create(userId: string, avatar: string) {
    let systemMessage = '';
    avatar === 'a'
      ? (systemMessage = "hello, I'm a system message Avarar A")
      : (systemMessage = "hello, I'm a system message Avarar B");
    const chat: Chat = {
      roomId: new Date().getTime().toString(),
      members: [userId],
      messages: [
        {
          sender: avatar === 'a' ? 'Avatar A' : 'Avatar B',
          content: systemMessage,
        },
      ],
    };
    this.chats.push(chat);
    return chat;
  }

  findChat(roomId: string) {
    return this.chats.find((chat) => chat.roomId === roomId);
  }

  findChats(userId: string) {
    return this.chats.filter((chat) => chat.members.includes(userId));
  }

  acceptInvitation(roomId: string, userId: string) {
    const chat = this.chats.find((chat) => chat.roomId === roomId);
    chat.members.push(userId);
    return chat;
  }

  sendMessage(sender: string, roomId: string, content: string) {
    const chat = this.chats.find((chat) => chat.roomId === roomId);
    chat.messages.push({ sender, content });
    return chat;
  }

  invitation(roomId: string, userId: string) {
    const chat = this.chats.find((chat) => chat.roomId === roomId);
    chat.members.push(userId);
    return chat;
  }
}
