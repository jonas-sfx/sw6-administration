/**
 * @module core/service/utils/string
 */
import capitalizeString from 'lodash/capitalize';
import camelCase from 'lodash/camelCase';

export default {
    capitalizeString,
    camelCase,
    isEmptyOrSpaces
};

/**
 * Gets if the content of the string is really empty.
 * This does also remove any whitespaces that might
 * exist in the text.
 *
 * @param {string} string
 * @returns {boolean}
 */
function isEmptyOrSpaces(value) {
    return (!value || value.length <= 0) ? true : value.trim().length <= 0;
}
