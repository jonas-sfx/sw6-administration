/**
 * Checks if an element is existent, without causing the test to fail
 *
 * @param {String} selector
 * @param callback
 * @returns {exports}
 */
exports.command = function checkIfElementExists(selector, callback) {
    const self = this;
    const cb = function (result) {
        if (typeof callback === 'function') {
            callback.call(self, result);
        }
    };

    // Check if selector is present and defining the callback accordingly
    this.execute(function (selector) {
        return document.querySelector(selector) !== null;
    }, [selector], function (result) {
        cb(result.value);
    });

    return this;
};

