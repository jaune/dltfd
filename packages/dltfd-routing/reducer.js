const initialState = {
  path: null,
  url: null,
  key: null
};

module.exports = function (state, action) {
  if (typeof state === 'undefined') {
    return Object.assign({}, initialState); // Clone initialState !!!
  }

  switch (action.type) {
    case 'router/PUSH_HISTORY_STATE':
      return Object.assign({}, action.payload);
    case 'router/POP_HISTORY_STATE':
      return Object.assign({}, action.payload);
  }

  return state;
}
