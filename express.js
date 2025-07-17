const express = require('express')
const ditto = require('./pokemon/ditto.json') // Import the Ditto Pokémon data from a JSON file
const app = express()
const PORT = process.env.PORT || 3000

app.disable('x-powered-by') // Disable the 'X-Powered-By' header for security reasons

// Middleware
app.use(express.json()) // Middleware to parse JSON bodies in requests
// This below is replaced by the express.json() middleware
// app.use((req, res, next) => {
//   console.log('Mi primer middleware')
//   if (req.method !== 'POST') return next() // If the request is not a POST, continue to the next middleware
//   if (req.headers['content-type'] !== 'application/json') return next()

//   let body = ''
//   req.on('data', chunk => {
//     body += chunk.toString() // Convert Buffer to string. Buffer means 'binary data'
//   })

//   req.on('end', () => {
//     const data = JSON.parse(body)
//     data.timestamp = Date.now() // Add a timestamp
//     req.body = data
//     next() // Call next() to pass control to the next middleware or route handler
//   })
// })

// app.get('/', (req, res) => {
//   res.send('<h1>Welcome to the Pokémon API</h1>')
// })

app.get('/pokemon/ditto', (req, res) => {
  res.json(ditto)
})

app.post('/pokemon', (req, res) => {
  res.status(201).json(req.body) // Respond with the created data
})

app.use((req, res) => { // .use engloba todas las acciones: get, post, put, delete, etc.
  res.status(404).send('<h1>NOT FOUND 404!!! :(</h1>')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
