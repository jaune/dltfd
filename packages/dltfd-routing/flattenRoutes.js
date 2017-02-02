function joinPattern(a, b) {
  return a + b;
}

function flattenArray(a) {
  return Array.prototype.concat.apply([], a);
}

module.exports = function flattenRoutes (node) {
  if (Array.isArray(node)) {
    return flattenArray(node.map(function (node) {
      return flattenRoutes(node);
    }));
  }

  if (typeof node !== 'object') {
    throw new Error(`Invalid parameter. flattenRoutes's first parameter must be an object or an array, but its value is \`${node}\`.`);
  }

  let hasPath = node.hasOwnProperty('path');
  let hasComponent = node.hasOwnProperty('component');
  let hasChildren = node.hasOwnProperty('children') && Array.isArray(node.children);

  // Layout
  if (!hasPath && hasComponent) {
    if (!hasChildren) {
      throw new Error('Layout must have children.');
    }

    return flattenArray(node.children.map(function (child) {
      return flattenRoutes(child);
    }));
  }

  // Abstract or Entry-point
  if (hasPath) {
    let result = [];

    if (hasComponent) {
      result.push({
        pattern: node.path,
        component: node.component
      });
    }

    if (hasChildren) {
      let children = flattenArray(node.children.map(function (child) {
        return flattenRoutes(child);
      }));

      result = result.concat(children.map(function (child) {
        child.path = joinPattern(node.path, child.path);
        return child;
      }));
    }

    return result;
  }

  throw new Error('Unsupported route (hasPath: ' + hasPath + ', hasComponent: ' + hasComponent + ').');
}
