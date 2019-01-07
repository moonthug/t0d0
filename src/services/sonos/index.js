const { Sonos: SonosClient, DeviceDiscovery } = require('sonos');

export default class Sonos {
  constructor(host) {
    this.sonos = new SonosClient(host);
    this.host = host;
    this.description = null;
    this.currentTrack = null;
  }

  /**
   * @static
   * @param {Number} timeout
   * @param {function} cb
   * @returns {DeviceDiscovery}
   */
  static async startDeviceDiscovery(timeout, cb) {
    return DeviceDiscovery({ timeout }, async device => {
      let info;

      try {
        const sonos = new Sonos(device.host);
        info = await sonos.getInfo();
      } catch (e) {
        return cb(e);
      }

      const service = {
        device,
        ...info
      };

      cb(null, service);
    });
  }

  async getInfo() {
    const info = {};
    try {
      info.description = await this.getDeviceDescription();
      info.currentTrack = await this.getCurrentTrack();
      return info;
    } catch (e) {
      throw e;
    }
  }

  /**
   *
   * @returns {Promise<void>}
   */
  async getDeviceDescription() {
    return this.sonos.deviceDescription();
  }

  /**
   *
   * @returns {Promise<void>}
   */
  async getCurrentTrack() {
    return this.sonos.currentTrack();
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
}
