import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import rivalsApiConfig from './config/rivals-api.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [rivalsApiConfig],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
