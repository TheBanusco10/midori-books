/**
 * Replaces a specific text between a string
 *
 * @param originalString
 * @param replace
 * @param start
 * @param end
 * @returns {string}
 */
const replaceBetween = (originalString, replace, start, end) => {
    return originalString.substring(0, start) + replace + originalString.substring(end);
};

module.exports = {
    replaceBetween
}