const flattenRoutes = require('./flattenRoutes.js');

module.exports = function indexRoutes (node) {
  const flatRoutes = flattenRoutes(node);

  return flatRoutes.reduce(function (result, route) {
    result[route.pattern] = route;
    return result;
  }, {});
};
