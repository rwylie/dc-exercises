var initialState = {};    ///if using a list an empty list goes here

export function contacts (state, action)  {
  if (state === undefined) {
  return initialState;   //if first time reducer is called, what's the initial state...
}
//reducer has to respond to our actions, so this part should be the pure function:
  switch (action.type) {
    case 'ADD_CONTACT':
      return Object.assign(
        {},
        state,
        {[action.id]: action.data}  //third option
      );

    default:
      return state;
  }
}

export default contacts;
