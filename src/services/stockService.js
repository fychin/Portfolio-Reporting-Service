import got from 'got/dist/source';
import { API_KEY, STOCK_SERVICE_URL } from '../constants';
import { getMostRecentEndOfMonthBusinessDay } from '../services/dateService';

const client = got.extend({
  prefixUrl: STOCK_SERVICE_URL,
  responseType: 'json',
});

function getDailyStockQuotesUrl(ticker) {
  const functionParam = 'function=TIME_SERIES_DAILY';
  const tickerParam = `symbol=${ticker}`;
  const apiKeyParam = `apikey=${API_KEY}`;
  return `query?${functionParam}&${tickerParam}&${apiKeyParam}`;
}

function transformHistoricalQuotesResponse(response) {
  if (response.statusCode !== 200) {
    throw response;
  }

  response = response.body;
  try {
    const lastBusinessDayOfMonthStr = getMostRecentEndOfMonthBusinessDay().toISODate();
    const dailyStockQuotes = response['Time Series (Daily)'];
    const metadata = response['Meta Data'];

    const symbol = metadata['2. Symbol'];
    const lastRefreshed = metadata['3. Last Refreshed'];
    const closePrice = dailyStockQuotes[lastBusinessDayOfMonthStr]["4. close"];
    const report = {
      symbol,
      lastRefreshed,
      report: {
        date: lastBusinessDayOfMonthStr,
        closePrice
      }
    };
    return report;
  } catch (error) {
    throw error;
  }

}

export function fetchMostRecentEndOfMonthClosingPrice(ticker) {
  const dailyStockQuotesApi = getDailyStockQuotesUrl(ticker);
  return client(dailyStockQuotesApi)
    .then(response => transformHistoricalQuotesResponse(response));
}