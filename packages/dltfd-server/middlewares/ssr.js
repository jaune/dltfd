function requireClient() {
  if (process.env.NODE_ENV !== 'production') {
    // Delete cache !!!
    Object.keys(require.cache)
      .filter(function (key) {
        return !/node_modules/.test(key);
      })
      .filter(function (key) {
        return /dltfd-client/.test(key);
      })
      .forEach(function (key) {
        delete require.cache[key];
      });
  }
  return require('dltfd-client');
}

module.exports = function () {
  const ReactRouter = require('react-router');
  const React = require('react');
  const ReactRedux = require('react-redux');
  const Redux = require('redux');
  const ReactDOMServer = require('react-dom/server');
  const renderPage = require('../lib/page-renderer.js');

  const createMatcher = require('dltfd-routing/createMatcher.js');
  const RoutingProvider = require('dltfd-routing/components/Provider.js');

  return function (req, res, next) {
    // Only GET request
    if (req.method !== 'GET') {
      return next();
    }

    // Express knows best
    if (req.route) {
      return next();
    }

    const client = requireClient();
    const matcher = createMatcher(client.routes);
    const result = matcher.match(req.url);

    // Not found ?
    if (!result) {
      return next();
    }

    let language = req.acceptsLanguages(['fr-FR', 'en-US']);

    if (!language) {
      language = 'en-US';
    }

    const initialState = {
      page: {
        title: '<title>',
        language: language,
        dir: 'ltr'
      },
      routing: {
        pattern: result.pattern
      }
    }

    const store = Redux.createStore(
      client.reducers,
      initialState
    );

    const router = React.createElement(RoutingProvider, { routes: client.routes });
    const element = React.createElement(ReactRedux.Provider, { store: store }, router);
    const body = ReactDOMServer.renderToString(element);

    res.send(renderPage('main', body, store.getState()));
  };

};
