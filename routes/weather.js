const express = require('express')
const router = express.Router()
const getEverything = require('../lib/open-whether-api')

/* GET news */
router.get('/', async function (req, res, next) {
  const weather = await getEverything()
  console.log(weather)
  if (weather.cod === '200') {
    const data = {
      count: weather.cnt,
      location: weather.city.name,
      data: weather.list.map((w) => {
        return {
          date: new Date(w.dt * 1000).toDateString(),
          main: w.weather[0].main,
          temp: w.main.temp
        }
      })
    }

    res.send(data)
  } else {
    res.status(503).send('Service not available')
  }
})

module.exports = router
