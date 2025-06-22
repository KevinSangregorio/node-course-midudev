const http = require('node:http')
const fs = require('node:fs')
// const { findAvailablePort } = require('./free-port.js')

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  if (req.url === '/') {
    res.statusCode = 200 // OK
    res.end('Bienvenido a mi página web')
  } else if (req.url === '/instructivo') {
    fs.readFile('./qr-instructivo-lombok.png', (err, data) => {
      if (err) {
        res.statusCode = 500 // Internal Server Error
        res.end('Error al cargar la imagen')
      } else {
        res.setHeader('Content-Type', 'image/png')
        res.statusCode = 200 // OK
        res.end(data)
      }
    })
  } else {
    res.statusCode = 404 // Not Found
    res.end('Página no encontrada')
  }
}

const server = http.createServer(processRequest)

const desiredPort = process.env.PORT ?? 3000

// findAvailablePort(desiredPort)
//   .then(port => {
//     server.listen(port, () => {
//       console.log(`Server is listening on port ${port}`)
//     })
//   })
//   .catch(err => {
//     console.error('Error finding available port:', err)
//   })

server.listen(desiredPort, () => {
  console.log(`Server is listening on port ${desiredPort}`)
})
