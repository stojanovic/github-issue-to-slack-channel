'use strict'

const ApiBuilder = require('claudia-api-builder'),
  api = new ApiBuilder(),
  Request = require('request-promise')

// Export the API
module.exports = api

// API endpoints
// Generic API endpoint
api.get('/', () => 'Hello!')

api.post('/', request => {
  if (request.headers['X-GitHub-Event'] !== 'issues' || request.body.action !== 'opened')
    return '🙈 '

  let response = {
    channel: request.env.SLACK_CHANNEL,
    username: request.env.SLACK_USERNAME,
    icon_url: "https://raw.githubusercontent.com/jsbelgrade/assets/master/logo/JSBelgrade-logo-512.png",
    text: `*<${request.body.issue.user.html_url}|${request.body.issue.user.login}>* submitted a new talk proposal: "${request.body.issue.title}". Check it here: <${request.body.issue.html_url}|${request.body.issue.html_url}>.`
  }

  return Request.post({
    uri: request.env.SLACK_URL,
    form: {
      payload: JSON.stringify(response)
    }
  })
  .then(() => 'Thanks Github!')
})
