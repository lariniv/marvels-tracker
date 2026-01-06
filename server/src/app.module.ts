import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule } from '@nestjs/config';
import rivalsApiConfig from './config/rivals-api.config.js';
import { UserModule } from './user/user.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { RivalsModule } from './rivals/rivals.module.js';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [rivalsApiConfig],
    }),
    ScheduleModule.forRoot(),
    UserModule,
    PrismaModule,
    RivalsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
