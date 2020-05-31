const io = require('./io')
const logger = require('./logger')
const yargs = require('yargs')

// Configure save file's name
const FILE_NAME = 'notes.json'

logger.info('NOTES')

yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string'
    }
  },
  handler: argv => {
    const title = argv.title
    const body = argv.body
    logger.info(`Adding a new note with title: ${title}...`)
    io.insert(FILE_NAME, title, body)
    logger.success('Note has been saved.')
  }
}).help()

yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler: argv => {
    const title = argv.title
    logger.info(`Removing a note with title: ${title}...`)
    io.remove(FILE_NAME, title)
    logger.success('Note has been deleted.')
  }
}).help()

yargs.command({
  command: 'list',
  describe: 'List notes',
  handler: () => {
    logger.info('Listing notes...')
    const notes = io.list(FILE_NAME)
    logger.success(notes)
  }
}).help()

yargs.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true
    }
  },
  handler: argv => {
    const title = argv.title
    logger.info(`Reading a note with title ${title}...`)

    const note = io.select(FILE_NAME, title)

    if (note) {
      logger.success(`${note.title} - ${note.timestamp}\n\n${note.body}`)
    } else {
      logger.error(`Note cannot be found with the ${title} title!`)
    }
  }
}).help()

yargs.parse()
