//--------------------------------------------------------------
// Most applications will have ONE store
// One object that represents entire application

// One argument: PURE function = reducer(existingState, action)
// Computes new state & returns new state

// ES6 Option: Default state if doesn't exist
// equal: 	state = state || { name: 'Anonymous' };
//--------------------------------------------------------------

var redux = require('redux');
var thunk = require('redux-thunk').default;
var {
	nameReducer,
	hobbiesReducer,
	moviesReducer,
	mapReducer
} = require('./../reducers/index');

export var configure = () => {
	// Declare which field of the state will be managed by which reducer
	var reducer = redux.combineReducers({
		// name state will be managed by nameReducer
		name: nameReducer,
		hobbies: hobbiesReducer,
		movies: moviesReducer,
		map: mapReducer
	});

	var store = redux.createStore(
		reducer,
		// Weird syntax to enable redux chrome dev tools
		redux.compose(
			redux.applyMiddleware(thunk),
			window.devToolsExtension ? window.devToolsExtension() : f => f
		)
	);

	return store;
};
