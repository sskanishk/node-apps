const fs = require('fs')
const chalk = require('chalk')

const readNotes = (title) => {
    const notes = loadNotes()

    const note = notes.find((note) => note.title === title)
        
    if(note){
        console.log(chalk.green(' >> Title: ') + note.title)
        console.log(chalk.green(' >> Body: ') + note.body)
    } else {
        console.log(chalk.red(' >> Note not found!'))
    }
    
    // console.log(notes.title)
    // console.log(title)
}


const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.underline.green('Your Notes!'))
    let i = 1
    notes.forEach((note) => {
        console.log(chalk.keyword('orange')(i+".") + " " + note.title)
        i = i + 1
    });

}


const removeNotes = (title) => {
    const notes = loadNotes()

    const notesKeep = notes.filter((notes) => notes.title !== title)

    if(notes.length > notesKeep.length){
        console.log(chalk.red(" >> Note Removed!"))
    } else {
        console.log(chalk.keyword('orange')(" >> Note already removed!"))
    }
    saveNotes(notesKeep)
}

const getNotes = () => {
    message = 'Your notes...'
    return message
}


const addNotes = (title, body) => {
    const notes = loadNotes()
    // const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNote = notes.find((note) => note.title === title)


    if(!duplicateNote){
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
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNotes: readNotes
}