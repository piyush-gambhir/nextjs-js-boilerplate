/**
 * Converts a given timestamp to a formatted date and time string.
 *
 * @param {number} timestamp - The timestamp to convert (in milliseconds).
 * @param {string} locale - The locale string (e.g., 'en-US').
 * @param {object} dateOptions - Formatting options for the date.
 * @param {object} timeOptions - Formatting options for the time.
 * @returns {object} An object containing the formatted date and time strings.
 */

export function convertTimestamp(
  timestamp,
  locale = "en-US",
  dateOptions = {},
  timeOptions = {},
) {
  try {
    const date = new Date(timestamp);

    const defaultDateOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };

    const defaultTimeOptions = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };

    const formatDateOptions = { ...defaultDateOptions, ...dateOptions };
    const formatTimeOptions = { ...defaultTimeOptions, ...timeOptions };

    const formattedDate = new Intl.DateTimeFormat(
      locale,
      formatDateOptions,
    ).format(date);
    const formattedTime = new Intl.DateTimeFormat(
      locale,
      formatTimeOptions,
    ).format(date);

    return {
      date: formattedDate,
      time: formattedTime,
    };
  } catch (error) {
    console.error("Invalid timestamp provided", error);
    return null;
  }
}
