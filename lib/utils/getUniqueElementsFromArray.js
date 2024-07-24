/**
 * Gets unique elements from an array.
 *
 * @param {array} array - The array to process.
 * @returns {array} The array with unique elements.
 */
export function unique(array) {
  return [...new Set(array)];
}
