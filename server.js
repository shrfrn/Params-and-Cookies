'use strict'

const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cookieParser())

app.get('/api/page/:id', (req, res) => {
    console.log('hi');
    res.send(stringifyPayload(req))
})

app.get('/api/page', (req, res) => {
    console.log('hi');
    res.send(stringifyPayload(req))
})

app.get('/api/toggle-cookie', (req, res) => {
    req.cookies.aCookie ? 
        res.clearCookie('aCookie') : 
        res.cookie('aCookie', 'Chocolate Chip')
    
    res.send(stringifyPayload(req))
})

app.get('/api/:book', (req, res) => {
    res.send(stringifyPayload(req))
})

app.get('*', (req, res) => {
    res.send(stringifyPayload(req))
})

function stringifyPayload(req){
    const resStr = `
        <pre style="margin: 20px">
            \nRoute: ${req.route.path}
            \nRoute Params: ${JSON.stringify(req.params, null, 4)}
            \nQuery String Params: ${JSON.stringify(req.query, null, 4)}
            \nCookies in request: ${JSON.stringify(req.cookies, null, 4)}
        </pre>
    `
    return resStr
}

const port = 3001
app.listen(port, '127.0.0.1')

console.log(`Server running at http://127.0.0.1:${port}...`)
console.log('Is there anybody out there?');