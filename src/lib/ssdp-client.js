const ssdp = require('node-ssdp');

export default class SsdpClient {
  /**
   *
   * @param {Object} options
   */
  constructor(options) {
    this.client = new ssdp.Client(options);
  }

  /**
   *
   * @param {String} eventName
   * @param {function} callback
   * @returns {*}
   */
  on(eventName, callback) {
    return this.client.on(eventName, callback);
  }

  /**
   *
   * @param {String} eventName
   * @param {function} callback
   * @returns {*}
   */
  off(eventName, callback) {
    return this.client.off(eventName, callback);
  }

  /**
   *
   * @returns {*}
   */
  start() {
    return this.client.start();
  }

  /**
   *
   * @param {String} urn
   * @returns {*}
   */
  search(urn) {
    return this.client.search(urn);
  }
}
