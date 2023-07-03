import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as fs from 'fs';

@Injectable()
export class LotusListingService {
    private static readonly API_PREFIX = 'https://lotusmarket.io/api';
    private readonly logger = new Logger(LotusListingService.name);

    constructor(private httpService: HttpService) {}

    @Cron(CronExpression.EVERY_30_SECONDS)
    async syncLotusListing() {
        this.logger.debug('Syncing lotus listing');

        const params = {
            "page":"1",
            "per_page":"10",
            "filterType":"1",
            "orderBy":"{\"field\":\"pool_creation_time\",\"strategy\":\"desc\"}",
            "blockchain":["1"],
            "perPage":"1000",
            "favouriteTokens":"false"
          };
        const url = `${LotusListingService.API_PREFIX}/user-tokens/data`;

        let response;
        try {
            response = await this.httpService.post(url, { params }).toPromise();
        } catch (err) {
            this.logger.error(`Failed to get lotus listing: ${err}. Url requested: ${url}`);
        }

        fs.writeFileSync('var/listing.json', JSON.stringify(response.data.data));

        this.logger.debug('Synced lotus listing');
    }
}
