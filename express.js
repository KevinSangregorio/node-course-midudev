const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.disable('x-powered-by') // Disable the 'X-Powered-By' header for security reasons

app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Pokémoppn API</h1>')
})

app.post('/pokemon', (req, res) => {
  let body = ''
  req.on('data', chunk => {
    body += chunk.toString() // Convert Buffer to string. Buffer means 'binary data'
  })
  req.on('end', () => {
    const data = JSON.parse(body)

    data.timestamp = Date.now() // Add a timestamp
    res.status(201).json(data) // Respond with the created data
  })
})

app.use((req, res) => {
  res.status(404).send('<h1>NOT FOUND 404!!! :(</h1>')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
