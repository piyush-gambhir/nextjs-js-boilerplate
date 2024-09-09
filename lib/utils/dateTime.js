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
  dateOptions = { year: "numeric", month: "long", day: "2-digit" },
  timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  },
) {
  try {
    const date = new Date(timestamp);

    const formattedDate = new Intl.DateTimeFormat(locale, dateOptions).format(
      date,
    );
    const formattedTime = new Intl.DateTimeFormat(locale, timeOptions).format(
      date,
    );

    return {
      date: formattedDate,
      time: formattedTime,
    };
  } catch (error) {
    console.error("Invalid timestamp provided", error);
    return {
      date: "Invalid date",
      time: "Invalid time",
    };
  }
}

export function formatDate(
  dateInput,
  { includeRelative = false, locale = "en-US" } = {},
) {
  const targetDate = new Date(dateInput);

  if (isNaN(targetDate.getTime())) {
    return "Invalid Date";
  }

  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - targetDate.getTime();

  // Full formatted date (e.g., September 8, 2024)
  const formattedDate = targetDate.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // If relative date is not required, return the formatted date
  if (!includeRelative) {
    return formattedDate;
  }

  // Calculate relative time (days, months, years ago)
  const relativeTime = getRelativeTime(timeDifference);
  return `${formattedDate} (${relativeTime})`;
}

// Helper function to calculate relative time from the time difference
function getRelativeTime(timeDifference) {
  const millisecondsInADay = 1000 * 60 * 60 * 24;
  const daysAgo = Math.floor(timeDifference / millisecondsInADay);

  if (daysAgo === 0) return "Today";
  if (daysAgo === 1) return "Yesterday";
  if (daysAgo < 30) return `${daysAgo} days ago`;

  const monthsAgo = Math.floor(daysAgo / 30);
  if (monthsAgo < 12) return `${monthsAgo} months ago`;

  const yearsAgo = Math.floor(monthsAgo / 12);
  return `${yearsAgo} years ago`;
}
