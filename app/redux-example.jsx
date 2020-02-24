var redux = require('redux');

console.log('Start REDUX');

// Most applications will have ONE store
// One object that represents entire application

// One argument: PURE function = reducer(existingState, action)
// Computes new state & returns new state

// ES6 Option: Default state if doesn't exist
// equal: 	state = state || { name: 'Anonymous' };
var reducer = (state = { name: 'Anonymous' }, action) => {
	return state;
};
var store = redux.createStore(reducer);

var currentState = store.getState();
console.log('currentState', currentState);
