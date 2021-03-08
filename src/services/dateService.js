import { DateTime } from "luxon";

export function getMostRecentEndOfMonthBusinessDay() {
  return getLastBusinessDateOfMonth();
}

function getEasternTimeNow() {
  return DateTime.now().setZone('America/New_York');
}

function isEndOfMonth(dateTime) {
  return dateTime.endOf('month').toISODate() === dateTime.toISODate();
}

function getEndOfMonthDate() {
  const currentDateTime = getEasternTimeNow()
  return isEndOfMonth(currentDateTime) ? currentDateTime
    : currentDateTime.minus({month: 1}).endOf('month');
}

function getLastBusinessDateOfMonthHelper(lastDateOfMonth) {
  if (lastDateOfMonth.weekday == 6 || lastDateOfMonth.weekday == 7) {
    const previousDay = lastDateOfMonth.minus({ days: 1 });
    return getLastBusinessDateOfMonthHelper(previousDay);
  }
  return lastDateOfMonth;
};

function getLastBusinessDateOfMonth() {
  const endOfMonthDate = getEndOfMonthDate();
  return getLastBusinessDateOfMonthHelper(endOfMonthDate);
}