import { Controller, Get, Param, Query } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  getChats(@Query('userId') userId: string) {
    return this.chatService.findChats(userId);
  }

  @Get(':id')
  getChat(@Param('id') id: string) {
    return this.chatService.findChat(id);
  }
}
