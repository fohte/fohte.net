const path = require('path')

const withRemoteRefresh = require('next-remote-refresh')({
  paths: [path.resolve(__dirname, 'contents/posts')],
})

module.exports = withRemoteRefresh({})
