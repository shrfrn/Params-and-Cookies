import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()
app.use(cookieParser())

app.get('/api/book', (req, res) => {
    res.send(stringifyPayload(req, res))
})

app.get('/api/book/:bookId', (req, res) => {
    res.send(stringifyPayload(req, res))
})

app.get('/api/book/:bookId/:chapterId', (req, res) => {
    res.send(stringifyPayload(req, res))
})

app.get('/api/set-cookie', (req, res) => {
    const flavors = ['Chocolate Chip', 'Jam', 'Butter', 'Lemon Cream']
    const idx = getRandomInt(flavors.length)

    res.cookie('test-cookie', flavors[idx])
    res.send(stringifyPayload(req, res))
})

app.get('/api/clear-cookie', (req, res) => {
    res.clearCookie('test-cookie')
    res.send(stringifyPayload(req, res))
})

app.get('/api/counter-cookie', (req, res) => {
    let count = req.cookies.count || 0
    
    res.cookie('count', ++count)
    res.send(stringifyPayload(req, res))
})

app.get('/api/expiring-cookie', (req, res) => {
    res.cookie('expiring-cookie', 'Hi', { maxAge: 3000 })
    res.send(stringifyPayload(req, res))
})

app.get('/api/:id', (req, res) => {
    res.send(stringifyPayload(req, res))
})

app.get('*', (req, res) => {
    res.send(stringifyPayload(req, res))
})

function stringifyPayload(req, res){
    const resStr = `
        <pre style="margin: 20px 5px">
            \nRoute: ${req.route.path}
            \nRoute Params: ${JSON.stringify(req.params, null, 4)}
            \nQuery String Params: ${JSON.stringify(req.query, null, 4)}
            \nCookies in request: ${JSON.stringify(req.cookies, null, 4)}
        </pre>
    `
    return resStr
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

const port = 3001
app.listen(port, '127.0.0.1')

console.log(`Server running at http://127.0.0.1:${port}...`)
console.log('Is there anybody out there?')