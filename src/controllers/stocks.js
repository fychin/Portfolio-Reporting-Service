import { fetchMostRecentEndOfMonthClosingPrice } from '../services/stockService';

export function fetchReportByTicker(req, res, next) {
  var ticker = req.params.ticker;
  fetchMostRecentEndOfMonthClosingPrice(ticker)
    .then(response => res.json(response))
    .catch(next);
}