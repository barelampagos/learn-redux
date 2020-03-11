var redux = require('redux');

console.log('Start REDUX');

//--------------------------------------------------------------
// Most applications will have ONE store
// One object that represents entire application

// One argument: PURE function = reducer(existingState, action)
// Computes new state & returns new state

// ES6 Option: Default state if doesn't exist
// equal: 	state = state || { name: 'Anonymous' };
//--------------------------------------------------------------

var oldReducer = (state = stateDefault, action) => {
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
		case 'REMOVE_HOBBY':
			return {
				...state,
				hobbies: state.hobbies.filter(hobby => hobby.id !== action.id)
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
		case 'REMOVE_MOVIE':
			return {
				...state,
				movies: state.movies.filter(movie => movie.id !== action.id)
			};
		default:
			return state;
	}
};

//--------------------------------------------------------------
// Custom Reducers
// state - type of field declared in combineReducers()
//--------------------------------------------------------------

// Name reducer and action generators
// state - String, default Anonymous
//--------------------------------------------------------------
var nameReducer = (state = 'Anonymous', action) => {
	switch (action.type) {
		case 'CHANGE_NAME':
			return action.name;
		default:
			return state;
	}
};

// action generator
var changeName = name => {
	return {
		type: 'CHANGE_NAME',
		name
	};
};

// hobbies reducer and action generators
// state - array
//--------------------------------------------------------------
var nextHobbyId = 1;
var hobbiesReducer = (state = [], action) => {
	switch (action.type) {
		case 'ADD_HOBBY':
			return [
				...state,
				{
					id: nextHobbyId++,
					hobby: action.hobby
				}
			];
		case 'REMOVE_HOBBY':
			return state.filter(hobby => hobby.id !== action.id);
		default:
			return state;
	}
};

var addHobby = hobby => {
	return {
		type: 'ADD_HOBBY',
		hobby
	};
};

var removeHobby = id => {
	return {
		type: 'REMOVE_HOBBY',
		id
	};
};

// movie reducer and action generators
//--------------------------------------------------------------
var nextMovieId = 1;
var moviesReducer = (state = [], action) => {
	switch (action.type) {
		case 'ADD_MOVIE':
			return [
				...state,
				{
					id: nextMovieId++,
					title: action.title,
					genre: action.genre
				}
			];
		case 'REMOVE_MOVIE':
			return state.filter(movie => movie.id !== action.id);
		default:
			return state;
	}
};

var addMovie = (title, genre) => {
	return {
		type: 'ADD_MOVIE',
		title,
		genre
	};
};

var removeMovie = id => {
	return {
		type: 'REMOVE_MOVIE',
		id
	};
};

// Declare which field of the state will be managed by which reducer
var reducer = redux.combineReducers({
	// name state will be managed by nameReducer
	name: nameReducer,
	hobbies: hobbiesReducer,
	movies: moviesReducer
});

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
store.dispatch(changeName('Bryan'));

store.dispatch(addHobby('Running'));

store.dispatch(addHobby('Walking'));

store.dispatch(removeHobby(2));

store.dispatch(changeName('Emily'));

store.dispatch(addMovie('Two Heroes', 'Action'));

store.dispatch(addMovie('Avengers', 'Adventure'));

store.dispatch(removeMovie(1));
