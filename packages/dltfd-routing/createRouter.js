var pathToRegexp = require('path-to-regexp');
const React = require('react');

module.exports = function (routes, settings) {
  var routes_byKey = {};

  routes = routes.map((route, index) => {
    return Object.assign({ key: 'route' + index }, route);
  });

  let i, l;

  for (i = 0, l = routes.length; i < l; i++) {
    routes_byKey['route' + i] = routes[i];
  }

  var matchers = routes.map(function (route) {
    var keys = [];

    return {
      regexp: pathToRegexp(route.pattern, keys),
      keys: keys
    }
  });

  function nameToResolveRoute (name, params) {
  }

  function pathToResolveRoute (path) {
    let candidate;

    let i, l, matches, matcher;

    for (i = 0, l = routes.length; i < l; i++) {
      matcher = matchers[i];
      matches = matcher.regexp.exec(path);

      if (Array.isArray(matches)) {

        candidate = {
          virtual: routes[i].virtual || false,
          key: routes[i].key,
          url: settings.base + path,
          params: {}
        };

        matcher.keys.forEach(function (key, index) {
          if (typeof key.name === 'string') {
            candidate.params[key.name] = matches[index + 1];
          }
        });

        return candidate;
      }
    }

    if (process.env.NODE_ENV !== 'production') {
      console.log('Warning: Missing route matches. `' + path + '`');
    }
  }

  return {
    getLayout: function () {
      return settings.layout;
    },
    createElements: function (key) {
      if (routes_byKey[key]) {
        return { children: React.createElement(routes_byKey[key].component) };
      }

      return { children: [] };
    },
    getComponents: function (key) {
      if (routes_byKey[key]) {
        return [ routes_byKey[key].component ];
      }
      return [];
    },
    getKeyFromPath: function (path) {
      const route = resolve(path);

      if (!route) {
        return;
      }
      return route.key;
    },
    getSettings: function () {
      return settings;
    },
    resolve: resolve
  };
};
