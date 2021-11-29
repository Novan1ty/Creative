// Mobile Logger ~ 11/7/21; November 7, 2021

const FS = require('fs')

function Open() {
    const Logs_JSON = FS.readFileSync('./JSON/Logs.json')
    const Logs = JSON.parse(Logs_JSON.toString())
    return Logs
}
function Write(Message) {
    const Logs = Open()
    Logs.push(Message)

    FS.writeFileSync('./JSON/Logs.json', JSON.stringify(Logs, null, 4))
}

const Routes = [
    '/characters', '/realms',
    '/regions', '/locations',
    '/items', '/ingredients',
    '/abilities', '/lores',
    '/creatures', '/floras',
    '/games', '/puzzles',
    '/vehicles', '/towns',
    '/conditions', '/planets',
    '/buildings', '/languages',
    '/countries', '/continents',
    '/religions', '/technologies',
    '/foods',
]

module.exports = { Open, Write, Routes }