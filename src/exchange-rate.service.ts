import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as fs from 'fs';

@Injectable()
export class ExchangeRateService {
    private readonly logger = new Logger(ExchangeRateService.name);

    constructor(private httpService: HttpService) {}

    @Cron(CronExpression.EVERY_30_MINUTES)
    async syncBinanceTicker() {
        this.logger.debug('Syncing binance ticker');

        const url = 'https://data.binance.com/api/v3/ticker/24hr';
        let response;

        try {
            response = await this.httpService.get(url).toPromise();
        } catch (err) {
            this.logger.error(`Failed to get binance ticker: ${err}. Url requested: ${url}`);
        }

        fs.writeFileSync('var/binance-ticker.json', JSON.stringify(response.data));

        this.logger.debug('Synced binance ticker');
    }

    // @Cron(CronExpression.EVERY_30_MINUTES)
    // async syncCurrencyExchangeRates() {
    //     this.logger.debug('Syncing fiat currency exchange rates');

    //     const url = 'https://api.currencyapi.com/v3/latest';
    //     let response;

    //     try {
    //         response = await this.httpService.get(
    //             url, 
    //             { headers: { apikey: process.env.CURRENCYAPI_KEY } }
    //         ).toPromise();
    //     } catch (err) {
    //         this.logger.error(`Failed to get currency rates from currencyapi: ${err}. Url requested: ${url}`);
    //     }

    //     const result = {};
    //     Object.values(response.data.data).forEach((rate: any) => {
    //         result[rate.code] = rate.value;
    //     });

    //     fs.writeFileSync('var/currency-rates.json', JSON.stringify(result));

    //     this.logger.debug('Synced fiat currency exchange rates');
    // }

    // @Cron(CronExpression.EVERY_10_SECONDS)
    // async syncCryptoExchangeRates() {
    //     this.logger.debug('Syncing crypto exchange rates');

    //     const url = 'https://rest.coinapi.io/v1/exchangerate/USD?invert=false';
    //     let response;

    //     try {
    //         response = await this.httpService.get(
    //             url,
    //             { headers: { 'X-CoinAPI-Key': process.env.COINAPI_KEY } }
    //         ).toPromise();
    //     } catch (err) {
    //         this.logger.error(`Failed to get crypto rates from coinapi: ${err}. Url requested: ${url}`);
    //     }

    //     const result = {};
    //     response.data.rates.forEach(rate => {
    //         result[rate.asset_id_quote] = rate.rate;
    //     });

    //     fs.writeFileSync('var/crypto-rates.json', JSON.stringify(result));

    //     this.logger.debug('Synced crypto exchange rates');
    // }
}
