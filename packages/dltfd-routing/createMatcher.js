const pathToRegexp = require('path-to-regexp');
const flattenRoutes = require('./flattenRoutes.js');

module.exports = function (routes, settings) {
  const flatRoutes = flattenRoutes(routes);
  const matchers = flatRoutes.map(function (route) {
    var keys = [];

    return {
      route: route,
      regexp: pathToRegexp(route.pattern, keys),
      keys: keys
    }
  });

  return {
    match: function (path) {
      let i, l, matches, matcher;

      for (i = 0, l = matchers.length; i < l; i++) {
        matcher = matchers[i];
        matches = matcher.regexp.exec(path);

        if (Array.isArray(matches)) {

          let result = {
            path: path,
            pattern: matcher.route.pattern,
            params: {}
          };

          matcher.keys.forEach(function (key, index) {
            if (typeof key.name === 'string') {
              result.params[key.name] = matches[index + 1];
            }
          });

          return result;
        }
      }
      return null;
    }
  }
};
