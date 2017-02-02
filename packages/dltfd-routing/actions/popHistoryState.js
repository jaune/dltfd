module.exports = function (route) {
  return {
    type: 'router/POP_HISTORY_STATE',
    payload: route
  };
};
