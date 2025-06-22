const http = require('node:http')

const dittoJson = require('./pokemon/ditto.json')

const proccessRequest = (req, res) => {
  const { method, url } = req

  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':
          res.statusCode = 200 // OK
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          return res.end(JSON.stringify(dittoJson))
        default:
          res.statusCode = 404 // Not Found
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('<h1>Página no encontrada 404</h1>')
      }

    case 'POST':
      switch (url) {
        case '/pokemon': {
          let body = ''
          req.on('data', chunk => {
            body += chunk.toString() // Convert Buffer to string. Buffer means 'binary data'
          })
          req.on('end', () => {
            const data = JSON.parse(body)
            res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' })
            // Here you would typically save the newPokemon to a database
            data.timestamp = Date.now() // Add a timestamp
            res.end(JSON.stringify(data))
          })
          break
        }
        default:
          res.statusCode = 404 // Not Found
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          return res.end('404 not found')
      }
  }
}

const server = http.createServer(proccessRequest)

server.listen(3000, () => {
  console.log('Server is listening on port 3000')
})
