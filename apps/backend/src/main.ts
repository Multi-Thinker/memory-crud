import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DatabaseService } from './database/database.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const databaseService = app.get(DatabaseService);
  databaseService.resetDatabase();
  await databaseService.createDefaultUsers();

  app.enableCors();
  await app.listen(3001);
}
bootstrap();
