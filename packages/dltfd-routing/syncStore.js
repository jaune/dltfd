/* global window */

const popHistoryState = require('./actions/popHistoryState.js');

module.exports = function (store) {
  window.history.replaceState(store.getState().router, '');

  window.addEventListener('popstate', function (event) {
    store.dispatch(popHistoryState(event.state));
  });
}
