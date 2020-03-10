var redux = require('redux');

console.log('Start REDUX');

// Most applications will have ONE store
// One object that represents entire application

// One argument: PURE function = reducer(existingState, action)
// Computes new state & returns new state

// ES6 Option: Default state if doesn't exist
// equal: 	state = state || { name: 'Anonymous' };
var reducer = (state = { name: 'Anonymous' }, action) => {
	console.log('New Action', action);
	switch (action.type) {
		case 'CHANGE_NAME':
			return {
				...state,
				name: action.name
			};
		default:
			return state;
	}
};
var store = redux.createStore(
	reducer,
	// Weird syntax to enable redux chrome dev tools
	redux.compose(window.devToolsExtension ? window.devToolsExtension() : f => f)
);

// Subscribe to changes - listen to any changes to state
// returns callback used to unsubscribe a callback
var unsubscribe = store.subscribe(() => {
	var state = store.getState();

	console.log('Name is', state.name);
	document.getElementById('app').innerHTML = state.name;
});
// unsubscribe();

var currentState = store.getState();
console.log('currentState', currentState);

// State updates happen via Actions
var action = {
	// All actions require 'type' attr
	type: 'CHANGE_NAME',
	name: 'Bryan'
};

// Action dispatched to store
store.dispatch(action);

store.dispatch({
	type: 'CHANGE_NAME',
	name: 'Emily'
});
