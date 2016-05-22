'use strict'

const ApiBuilder = require('claudia-api-builder'),
  api = new ApiBuilder()

// Export the API
module.exports = api

// API endpoints
// Generic API endpoint
api.get('/', () => 'Hello!')
