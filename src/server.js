import http from 'http'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RoutingContext } from 'react-router'
import fs from 'fs'
import { createPage, write, writeError, writeNotFound, redirect } from './utils/server-utils'
import routes from './routes/RootRoute'

const PORT = process.env.PORT || 8000

function renderApp(props, res) {
  const markup = renderToString(<RoutingContext {...props}/>)
  const html = createPage(markup)
  write(html, 'text/html', res)
}

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
      match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
        if (error)
          writeError('ERROR!', res)
        else if (redirectLocation)
          redirect(redirectLocation, res)
        else if (renderProps)
          renderApp(renderProps, res)
        else
          writeNotFound(res)
      })
    }

  }).listen(PORT)
  console.log(`listening on port ${PORT}`)
}
