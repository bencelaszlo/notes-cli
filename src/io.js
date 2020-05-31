const logger = require('./logger')
const fs = require('fs')

let data

const insert = (fileName, title, body) => {
  read(fileName)

  if (!data.find(item => item.title === title)) {
    data.push({
      title,
      body,
      timestamp: new Date().toLocaleString()
    })
    write(fileName)
  }
}

const write = fileName => {
  try {
    fs.writeFileSync(fileName, JSON.stringify(data))
  } catch (error) {
    logger.error(JSON.stringify(error))
  }
}

const read = fileName => {
  try {
    data = JSON.parse(fs.readFileSync(fileName))
  } catch (error) {
    logger.warning(JSON.stringify(error))
    data = []
  }
}

const select = (fileName, title) => {
  read(fileName)
  return data.find(data => data.title === title)
}

const list = (fileName) => {
  read(fileName)

  if (data && data.length) {
    return data.map(item => `${item.title} - ${item.timestamp}`)
  } else {
    return []
  }
}

const remove = (fileName, title) => {
  read(fileName)
  data = data.filter(item => item.title !== title)
  write(fileName)
}

module.exports = {
  insert,
  select,
  list,
  remove
}
