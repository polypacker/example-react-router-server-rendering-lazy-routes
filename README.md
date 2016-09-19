React Router and Polypacker Example: Server Rendering Lazy Routes
==================================================

Forked from [Ryan Florence's example](https://github.com/ryanflorence/example-react-router-server-rendering-lazy-routes)

This minimal demo shows how to get the benefits of server rendering and
partial app loading with lazy routes and webpack's code splitting, using [polypacker](https://github.com/polypacker/polypacker)

## Running

``` bash
npm install
npm run watch
open http://localhost:3000/dist/[id].index.js # to observe files
# follow normal usage instructions from [django-webpack-loader](https://github.com/owais/django-webpack-loader/)
```

## How it works

1. Webpack's `require.ensure` defines code splitting points in the app, enabled through polypacker with the flag `--chunkFilename '[id].chunk.js'`
2. We polyfill `require.ensure` for node to just do a normal `require`.
3. The server renders the app with `match` and the stateless `<RoutingContext/>`.
4. When the client JavaScript loads, we use `match` to trigger the split
   code to load before rendering. If we didn't do that, then the first
   render would be `null` and not reuse the server rendered markup.
5. We render on the client.
6. We raise our arms in the air in triumph.
  
This example uses `polypacker --preset DJANGO_REACT` for standalone browser apps, and outputs a `webpack-stats.json` for use with [django-webpack-loader](https://github.com/owais/django-webpack-loader/).
