const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(config.news_api_key);

const getEverything = (params) => {
  const { query, 
          sources, 
          domains, 
          from_date = new Date().toISOString().slice(0, 10), 
          to_date = new Date().toISOString().slice(0, 10), 
          page = 1 } = params
  
  return newsapi.v2.everything({
    q: query,
    sources: sources,
    domains: domains,
    from: from_date,
    to: to_date,
    language: 'en',
    sortBy: 'relevancy',
    page: page
  })
}
module.exports = getEverything;