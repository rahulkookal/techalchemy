const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const axios = require('axios');

const getEverything = async () => {
    const url = `https://api.openweathermap.org/data/2.5/forecast/?id=524901&cnt=5&appid=${config.open_whether_api_key}`

    try {
        const { data } = await axios.get(url);
        return data
    } catch (err) {
        return err
    }
  }
  module.exports = getEverything;