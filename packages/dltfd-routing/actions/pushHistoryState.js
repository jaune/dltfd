module.exports = function (route) {
  return {
    type: 'router/PUSH_HISTORY_STATE',
    payload: route
  };
};
