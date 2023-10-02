import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [DatabaseService],
})
export class AppModule {}
