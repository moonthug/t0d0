/* eslint-disable prettier/prettier */
import emoji from "node-emoji";

export const fToC = f => (((f - 32) * 5) / 9).toFixed(2);

export const emojiMap = {
  'clear-day': emoji.get('sunny'),
  'clear-night': emoji.get('full_moon'),
  'rain': emoji.get('rain_cloud'),
  'snow': emoji.get('snow_cloud'),
  'sleet': emoji.get('snow_cloud'),
  'wind': emoji.get('dash'),
  'fog': emoji.get('fog'),
  'cloudy': emoji.get('cloud'),
  'partly-cloudy-day': emoji.get('sun_behind_cloud'),
  'partly-cloudy-night': emoji.get('waxing_gibbous_moon'),
  'hail': emoji.get('snow_cloud'),
  'thunderstorm': emoji.get('lightning_cloud'),
  'tornado': emoji.get('tornado'),
  'default': emoji.get('pizza'),
};

export const getEmojiForIcon = icon => {
  return emojiMap[icon] || emojiMap['default'];
};

export const degreesToDirection = d  => {
  if (typeof d !== 'number' || isNaN(d)) {
    return -1;
  }

  // keep within the range: 0 <= d < 360
  d = d % 360;

  if (d >= 11.25 && d < 33.75) {
    return "NNE";
  } else if (d >= 33.75 && d < 56.25) {
    return "NE";
  } else if (d >= 56.25 && d < 78.75) {
    return "ENE";
  } else if (d >= 78.75 && d < 101.25) {
    return "E";
  } else if (d >= 101.25 && d < 123.75) {
    return "ESE";
  } else if (d >= 123.75 && d < 146.25) {
    return "SE";
  } else if (d >= 146.25 && d < 168.75) {
    return "SSE";
  } else if (d >= 168.75 && d < 191.25) {
    return "S";
  } else if (d >= 191.25 && d < 213.75) {
    return "SSW";
  } else if (d >= 213.75 && d < 236.25) {
    return "SW";
  } else if (d >= 236.25 && d < 258.75) {
    return "WSW";
  } else if (d >= 258.75 && d < 281.25) {
    return "W";
  } else if (d >= 281.25 && d < 303.75) {
    return "WNW";
  } else if (d >= 303.75 && d < 326.25) {
    return "NW";
  } else if (d >= 326.25 && d < 348.75) {
    return "NNW";
  } else {
    return "N";
  }
};
