var redux = require('redux');

console.log('Start REDUX');

// Most applications will have ONE store
// One object that represents entire application

// One argument: PURE function = reducer(existingState, action)
// Computes new state & returns new state

// ES6 Option: Default state if doesn't exist
// equal: 	state = state || { name: 'Anonymous' };
var stateDefault = {
	name: 'Anonymous',
	hobbies: [],
	movies: []
};

var nextHobbyId = 1;
var nextMovieId = 1;

var reducer = (state = stateDefault, action) => {
	console.log('New Action', action);
	switch (action.type) {
		case 'CHANGE_NAME':
			return {
				...state,
				name: action.name
			};
		case 'ADD_HOBBY':
			return {
				...state,
				hobbies: [
					...state.hobbies,
					{
						id: nextHobbyId++,
						hobby: action.hobby
					}
				]
			};
		case 'ADD_MOVIE':
			return {
				...state,
				movies: [
					...state.movies,
					{
						id: nextMovieId++,
						title: action.title,
						genre: action.genre
					}
				]
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

	console.log('currentState', store.getState());
});
// unsubscribe();

// State updates happen via Actions
// Action dispatched to store
store.dispatch({
	// All actions require 'type' attr
	type: 'CHANGE_NAME',
	name: 'Bryan'
});

store.dispatch({
	type: 'ADD_HOBBY',
	hobby: 'Running'
});

store.dispatch({
	type: 'CHANGE_NAME',
	name: 'Emily'
});

store.dispatch({
	type: 'ADD_MOVIE',
	title: 'Two Heroes',
	genre: 'Action'
});

store.dispatch({
	type: 'ADD_MOVIE',
	title: 'Avengers',
	genre: 'Adventure'
});
