const fs = require('fs');
const chalk = require('chalk');


// ----- COMMAND METHODS -----

const listNotes = () => {
    let notesArray = loadNotes();
    console.log(chalk.yellow.inverse("YOUR NOTES"));
    notesArray.forEach(oneNote => console.log(oneNote.title));

}

const addNote = (title, body) => {
    let notesArray = loadNotes();

    //checking for duplicate note titles
    const duplicateNote = notesArray.find(oneNote => oneNote.title === title);

    if (!duplicateNote) {
        notesArray.push({
            title: title,
            body: body
        })
        saveNotes(notesArray);
        console.log('added the new note!');
    } else {
        console.log(`${chalk.bgRed('ERROR')} This title was already used, choose a different one.`);
    }
}

const removeNote = title => {
    let notesArray = loadNotes();
    filteredNotesArray = notesArray.filter(oneNote => oneNote.title !== title);
    if (filteredNotesArray.length < notesArray.length) {
        console.log(`${chalk.green.inverse('SUCCESS')} Removed note: ${chalk.bold(title)}`);
    } else {
        console.log(`${chalk.bgRed('ERROR')} No note found with the name: ${chalk.bold(title)}`);
    }
    saveNotes(filteredNotesArray);
}

const readNote = title => {
    let notesArray = loadNotes();
    let selectedNote = notesArray.find(oneNote => oneNote.title === title);
    if (!selectedNote) {
        console.log(`${chalk.bgRed('ERROR')} No note found with the provided title.`)
    } else {
        console.log(`${chalk.yellow.bold.underline(selectedNote.title)}`);
        console.log(selectedNote.body);
    }
}


// ----- UTIITY METHODS -----

const loadNotes = () => {
    try {
        const notesBuffer = fs.readFileSync('notes.json');
        const notesString = notesBuffer.toString();
        return JSON.parse(notesString);
    } catch (err) {
        return [];
    }
}

const saveNotes = notesArray => {
    const notesString = JSON.stringify(notesArray);
    fs.writeFileSync('notes.json', notesstring);
}


module.exports = {
    listNotes,
    addNote,
    removeNote,
    readNote
};