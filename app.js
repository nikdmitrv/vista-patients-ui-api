const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/patients', (req, res) => {
    const { list } = req.query
    if (list) {
        fs.readFile(path.join(__dirname, 'data', `${list}List.json`), (err, data) => {
            if (err) res.json({ status: 'fail', message: 'Could not find this list' })
            else res.json({ status: 'ok', data: JSON.parse(data) })
        })
    } else res.json({ status: 'fail', message: 'List name is undefined' })
})


app.use(express.static(path.join(__dirname, 'client', 'build')))


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})

module.exports = app