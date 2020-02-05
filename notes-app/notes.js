const fs = require('fs')
const chalk = require('chalk')

const removeNotes = (title) => {
    const notes = loadNotes()

    const notesKeep = notes.filter((notes) => notes.title !== title)

    if(notes.length > notesKeep.length){
        console.log(chalk.red(" >> Note Removed!"))
    } else {
        console.log(chalk.keyword('orange')(" >> Note already deleted!"))
    }
    saveNotes(notesKeep)
}


const getNotes = () => {
    message = 'Your notes...'
    return message
}


const addNotes = (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter((notes) => notes.title === title)

    if(duplicateNotes.length === 0){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green(" >> Note Added"))
    } else {
        console.log(chalk.keyword('orange')(" >> Note title already taken"))
    }    
}


const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}


const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch(e) {
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNotes: addNotes,
    removeNotes: removeNotes
}