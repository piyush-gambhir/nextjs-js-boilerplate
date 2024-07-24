/**
 * Generates a random alphanumeric string.
 *
 * @param {number} length - The length of the generated string.
 * @returns {string} The generated random string.
 */
export function generateRandomString(length) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
