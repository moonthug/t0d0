const ssdp = require('node-ssdp');

export default class SsdpServer {
  /**
   *
   * @param {Object} options
   */
  constructor(options) {
    this.server = new ssdp.Server(options);
  }

  /**
   *
   * @param {String} usn
   * @returns {*}
   */
  addUSN(usn) {
    return this.server.addUSN();
  }

  /**
   *
   * @param {String} eventName
   * @param {function} callback
   * @returns {*}
   */
  on(eventName, callback) {
    return this.server.on(eventName, callback);
  }
}
