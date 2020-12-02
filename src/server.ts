import App from './app'

const port = process.env.NODE_PORT || '3010'

App.express.listen(port, function () {
  console.log('App is listening on port 3000!')
})

module.exports = App.express
