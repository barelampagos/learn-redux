var redux = require('redux');

console.log('Starting REDUX');

var stateDefault = {
	searchText: '',
	showCompleted: false,
	todos: []
};

var reducer = (state = stateDefault, action) => {
	switch (action.type) {
		case 'CHANGE_TEXT':
			return {
				...state,
				searchText: action.searchText
			};
		default:
			return state;
	}
};
var store = redux.createStore(
	reducer,
	redux.compose(window.devToolsExtension ? window.devToolsExtension() : f => f)
);

var unsubscribe = store.subscribe(() => {
	var state = store.getState();

	console.log('Search Text:', state.searchText);
	document.getElementById('app').innerHTML = state.searchText;
});

console.log('currentState', currentState);

store.dispatch({
	type: 'CHANGE_TEXT',
	searchText: 'searched Text'
});

store.dispatch({
	type: 'CHANGE_TEXT',
	searchText: 'Round 2'
});

var currentState = store.getState();

console.log('currentState', currentState);
