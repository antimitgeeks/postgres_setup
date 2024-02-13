var winston = require('winston')
var { Loggly } = require('winston-loggly-bulk')

winston.add(
     new Loggly({
          token: '4ae22aa5-4494-4e16-bce3-903711b83e44',
          subdomain: 'vaibhavkumawat',
          tags: ['Winston-NodeJS'],
          json: true,
     }),
)

winston.log('info', 'winston started /logger.js')
module.exports = winston
