const moment = require('moment');

const HttpClient = require('../lib/http-client');

export const fToC = f => ((f - 32) * 5) / 9;

export const degreesToDirection = d => {
  if (typeof d !== 'number' || isNaN(d)) {
    return -1;
  }

  // keep within the range: 0 <= d < 360
  d = d % 360;

  if (d >= 11.25 && d < 33.75) {
    return 'NNE';
  } else if (d >= 33.75 && d < 56.25) {
    return 'NE';
  } else if (d >= 56.25 && d < 78.75) {
    return 'ENE';
  } else if (d >= 78.75 && d < 101.25) {
    return 'E';
  } else if (d >= 101.25 && d < 123.75) {
    return 'ESE';
  } else if (d >= 123.75 && d < 146.25) {
    return 'SE';
  } else if (d >= 146.25 && d < 168.75) {
    return 'SSE';
  } else if (d >= 168.75 && d < 191.25) {
    return 'S';
  } else if (d >= 191.25 && d < 213.75) {
    return 'SSW';
  } else if (d >= 213.75 && d < 236.25) {
    return 'SW';
  } else if (d >= 236.25 && d < 258.75) {
    return 'WSW';
  } else if (d >= 258.75 && d < 281.25) {
    return 'W';
  } else if (d >= 281.25 && d < 303.75) {
    return 'WNW';
  } else if (d >= 303.75 && d < 326.25) {
    return 'NW';
  } else if (d >= 326.25 && d < 348.75) {
    return 'NNW';
  } else {
    return 'N';
  }
};

export const emojiMap = {
  'clear-day': 'sunny',
  'clear-night': 'full_moon',
  'rain': 'rain_cloud',
  'snow': 'snow_cloud',
  'sleet': 'snow_cloud',
  'wind': 'dash',
  'fog': 'fog',
  'cloudy': 'cloud',
  'partly-cloudy-day': 'sun_behind_cloud',
  'partly-cloudy-night': 'waxing_gibbous_moon',
  'hail': 'snow_cloud',
  'thunderstorm': 'lightning_cloud',
  'tornado': 'tornado',
  'default': 'pizza',
};

export const getEmojiForIcon = icon => {
  return emojiMap[icon] || emojiMap['default'];
};

export default class DarkSky {
  /**
   *
   * @param {String} apiKey
   * @param {Object} [options={}] options
   */
  constructor(apiKey, options = {}) {
    this.httpClient = new HttpClient(options);

    const baseURL = options.baseURL || 'https://api.darksky.net/forecast';
    this.baseURL = `${baseURL}/${apiKey}`;
  }

  /**
   * @inheritDoc https://darksky.net/dev/docs
   *
   * @async
   * @param {Number} lat
   * @param {Number} lon
   * @returns {Promise<void>}
   */
  async getCurrentWeather(lat, lon) {
    try {
      const weather = await this.get(`/${lat},${lon}`);
      const data = {
        current: this._getWeatherObject(weather.currently),
        week: {
          summary: weather.daily.summary,
          data: weather.daily.data.map(this._getWeatherObject)
        }
      };
      return data;
    } catch (e) {
      throw e;
    }
  }

  /**
   * @inheritDoc https://darksky.net/dev/docs
   *
   * @async
   * @param {Number} lat
   * @param {Number} lon
   * @returns {Promise<void>}
   */
  async getWeather(lat, lon) {
    try {
      const weather = await this.get(`/${lat},${lon}`);
      const data = {
        current: this._getCurrentWeatherObject(weather.currently),
        week: {
          summary: weather.daily.summary,
          data: weather.daily.data.map(this._getDailyWeatherObject)
        }
      };
      return data;
    } catch (e) {
      throw e;
    }
  }

  /**
   *
   * @param {Object} data
   * @returns {Object}
   * @private
   */
  _getCurrentWeatherObject(data) {
    return {
      icon: getEmojiForIcon(data.icon),
      precipProbability: data.precipProbability * 100,
      temperature: fToC(data.temperature),
      time: moment(data.time, 'X').format('dddd'),
      summary: data.summary,
      windBearing: degreesToDirection(data.windBearing)
    };
  }
  /**
   *
   * @param {Object} data
   * @returns {Object}
   * @private
   */
  _getDailyWeatherObject(data) {
    return {
      icon: getEmojiForIcon(data.icon),
      precipProbability: data.precipProbability * 100,
      temperatureHigh: fToC(data.temperatureHigh),
      temperatureLow: fToC(data.temperatureLow),
      time: moment(data.time, 'X').format('dddd'),
      summary: data.summary,
      windBearing: degreesToDirection(data.windBearing)
    };
  }

  /**
   *
   * @param {String} path
   * @param {Object} options
   * @returns {Promise<void>}
   */
  async get(path, options) {
    return this.request('get', path, options);
  }

  /**
   *
   * @param {String} method
   * @param {String} path
   * @param {Object} options
   * @returns {Promise<void>}
   */
  async request(method, path, options) {
    const url = `${this.baseURL}${path}`;
    return this.httpClient.request(method, url, options);
  }
}
