export default (initState, handler) => {
  return function(state = initState, action) {
    if (handler.hasOwnProperty(action.type)) {
      return handler[action.type](state, action);
    }
    return state;
  };
};
