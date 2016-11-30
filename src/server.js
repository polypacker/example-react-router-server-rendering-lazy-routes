import http from 'http'
import fs from 'fs'
import requestRouter from 'polypack!example-react-router-polypack'
import routes from './routes/RootRoute'
import { write } from './utils/server-utils'


const handleReactRoutes = requestRouter({ routes })

const PORT = process.env.PORT || 8000

export default _ => {
  http.createServer((req, res) => {

    if (req.url === '/favicon.ico') {
      write('haha', 'text/plain', res)
    }

    // serve JavaScript assets
    else if (/dist/.test(req.url)) {
      fs.readFile(`.${req.url}`, (err, data) => {
        write(data, 'text/javascript', res)
      })
    }

    // handle all other urls with React Router
    else {
      handleReactRoutes(req, ({status, payload, redirect}) => {
        if(redirect){
          res.writeHead(status, { 'Location': payload })
        } else {
          res.writeHead(status, { 'Content-Type': 'text/html' })
          res.write(payload)
          res.end()
        }
      })
    }

  }).listen(PORT)
  console.log(`listening on port ${PORT}`)
}
