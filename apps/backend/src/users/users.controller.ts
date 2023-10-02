import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { UserDto } from '../dto/user.dto';
import { JoiValidationPipe } from '../pipe/joi-validation.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get()
  async findAll() {
    const users = await this.databaseService.readItems();
    return users;
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.databaseService.readItem(id);
    return user;
  }

  @Post()
  async create(@Body(new JoiValidationPipe(UserDto.schema)) UserDto: UserDto) {
    try {
      const user = await this.databaseService.createUser(UserDto);
      return user;
    } catch (error) {
      throw new BadRequestException('Username already exists');
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new JoiValidationPipe(UserDto.updateSchema)) updateUserDto: UserDto,
  ) {
    try {
      const user = await this.databaseService.updateUser(id, updateUserDto);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new BadRequestException('Unable to update');
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedUser = await this.databaseService.deleteUser(id);
    if (!deletedUser) {
      throw new NotFoundException('User not found');
    }
    return deletedUser;
  }
}
