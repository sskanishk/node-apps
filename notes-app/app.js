const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')


// customize yargs version
yargs.version('1.1.0')

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a note!',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note Body',
            demandOption: true,
            type: 'string' 
        }
    },
    handler: (argv) => notes.addNotes(argv.title, argv.body)
        
    // handler: function(argv){
    //     // console.log('Title: ' +  argv.title)
    //     // console.log('Your Note: ' + argv.body)
    //     notes.addNotes(argv.title, argv.body)
    // }
})


// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note!',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notes.removeNotes(argv.title)  
    // handler: function(argv){
    //     // console.log('Removing a command!')
    //     notes.removeNotes(argv.title)
    // }
})


// Create list command
yargs.command({
    command: 'list',
    describe: 'List your note!',
    handler: () => notes.listNotes()
})


// Create read command
yargs.command({
    command: 'read',
    describe: 'Read your note!',
    // handler: () => console.log('Read a command!')
    //  
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notes.readNotes(argv.title) 
})

// printing two times the list so cmted one
// console.log(yargs.argv)


// print the list one time
yargs.parse()








