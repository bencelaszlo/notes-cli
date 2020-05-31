const chalk = require('chalk')

const success = text => {
  console.log(chalk.green(text))
}

const warning = text => {
  console.log(chalk.yellow(text))
}

const error = text => {
  console.log(chalk.red(text))
}

const info = text => {
  console.log(chalk.blue(text))
}

module.exports = {
  success,
  warning,
  error,
  info
}
