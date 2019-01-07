import SsdpClient from '../lib/ssdp-client';

export default class ServiceDiscovery {
  constructor() {
    this.client = new SsdpClient();
  }

  search(urn) {
    this.client.search(urn);
  }

  on(eventName, callback) {
    this.client.on(eventName, callback);
  }

  off(eventName, callback) {
    this.client.off(eventName, callback);
  }
}
