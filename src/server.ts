import App from './app'

const port = process.env.NODE_PORT || '3010'

App.express.listen(port, function () {
  console.log(`App is listening on port ${port}!`)
})

console.log(1,process.env.NODE_OPTIONS)
console.log(2,process.env.VSCODE_INSPECTOR_OPTIONS)
module.exports = App.express
