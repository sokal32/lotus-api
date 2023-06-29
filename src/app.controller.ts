import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import * as fs from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/currency-rates')
  getCurrencyRates(): string {
    return fs.readFileSync('var/currency-rates.json').toString();
  }

  @Get('/crypto-rates')
  getCryptoRates(): string {
    return fs.readFileSync('var/crypto-rates.json').toString();
  }

  @Get('listing')
  getListing(): string {
    return fs.readFileSync('var/listing.json').toString();
  }

  @Get('binance-ticker')
  getBinanceTicker(): string {
    return fs.readFileSync('var/binance-ticker.json').toString();
  }
}
