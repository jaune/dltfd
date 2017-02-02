/* global window */

module.exports = store => next => action => {
  switch (action.type) {
    case 'router/PUSH_HISTORY_STATE':
      window.history.pushState(JSON.parse(JSON.stringify(action.payload)), '', action.payload.url);
      break;
  }
  return next(action);
};
