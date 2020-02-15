const fs = require('fs')

const FILE_NAME = 'notes.json';
// TODO: Move this definition to funciton-scope.
let data;
// TODO: Add chalk logging and error messages when a problem occurs.

const insert = (title, body) => {
    read();
    if (!data.find(item => item.title === title)) {
        data.push({ title, body, timestamp: new Date().toLocaleString() });
        write();
    }
}

const write = () => {
    try {
        fs.writeFileSync(FILE_NAME, JSON.stringify(data));
    } catch (error) {
        console.error(JSON.stringify(error));
    }
}

const read = () => {
    try {
        data = JSON.parse(fs.readFileSync(FILE_NAME));
    } catch (error) {
        data = [];
    }
}

const select = (title) => {
    read();
    return data.find(data => data.title === title)
}

const list = () => {
    read();
    if (data.length) {
        return data.map(item => item.title + ' - ' + item.timestamp)
    } else {
        return []
    }
}

const remove = (title) => {
    read();
    data = data.filter(item => item.title !== title)
    write();
}

module.exports = {
    insert,
    select,
    list,
    remove
}