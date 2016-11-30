React Router and Polypacker Example: Server Rendering Lazy Routes
==================================================

This branch demonstrates using a [polypack](https://github.com/polypacker/example-react-router-polypack) inside a fullstack application

Forked from [Ryan Florence's example](https://github.com/ryanflorence/example-react-router-server-rendering-lazy-routes)

This minimal demo shows how to get the benefits of server rendering and
partial app loading with lazy routes and webpack's code splitting, using [polypacker](https://github.com/polypacker/polypacker)

## Running

```
npm install
npm run watch
open http://localhost:8000
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
  
This example uses `polypacker --preset FULLSTACK_APPLICATION` to break the application into `node` and `browser` distributions under `dist`, based on `CONTEXT`, which is why the core logic from `./src/client.js` and `./src/server.js` are wrapped in exports and run from `./src/index.js` based on context. _Theoretically_, this approach should work with any valid `polypacker` configuration
