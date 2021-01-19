import App from './app'

const port = process.env.PORT || '3010'

App.express.listen(port, function () {
  console.log(`App is listening on port ${port}!`)
})

module.exports = App.express
