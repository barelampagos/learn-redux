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
var store = redux.createStore(reducer);

var action = {
	type: 'CHANGE_TEXT',
	searchText: 'searched Text'
};

console.log('currentState', currentState);

store.dispatch(action);
var currentState = store.getState();

console.log('currentState', currentState);
