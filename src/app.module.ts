import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { ExchangeRateService } from './exchange-rate.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    HttpModule,
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    ExchangeRateService,
  ],
})
export class AppModule {}
