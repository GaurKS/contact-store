/**
 * function to generate unique id's with set prefixes.
 * @param {string} prefix - prefix to be added to the id.
 * @param {number} length - length of the id including prefix.
 * @returns {string} - unique id.
 */
export const generateObjectId = (
  prefix: string | undefined,
  length = 8,
): string => {
  let id = prefix || '';

  // Always start the id with a char
  id += (Math.floor(Math.random() * 25) + 10).toString(36);

  // Add a timestamp in milliseconds (base 36) for uniqueness
  id += new Date().getTime().toString(36);

  // Similar to above, complete the Id using random, alphanumeric characters
  do {
    id += Math.floor(Math.random() * 35).toString(36);
  } while (id.length < length);

  return id;
};
