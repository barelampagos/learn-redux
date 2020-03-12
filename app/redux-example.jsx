console.log('Start REDUX');

var actions = require('./actions/index');
var store = require('./store/configureStore').configure();

// Subscribe to changes - listen to any changes to state
// returns callback used to unsubscribe a callback
var unsubscribe = store.subscribe(() => {
	var state = store.getState();

	if (state.map.isFetching) {
		document.getElementById('app').innerHTML = 'LOADING';
	} else if (store.map.url) {
		document.getElementById('app').innerHTML =
			'<a href="' + state.map.url + '" target="_blank">View Your Location</a>';
	}

	console.log('currentState', store.getState());
});
// unsubscribe();

store.dispatch(actions.fetchLocation());

// State updates happen via Actions
// Action dispatched to store
store.dispatch(actions.changeName('Bryan'));

store.dispatch(actions.addHobby('Running'));

store.dispatch(actions.addHobby('Walking'));

store.dispatch(actions.removeHobby(2));

store.dispatch(actions.changeName('Emily'));

store.dispatch(actions.addMovie('Two Heroes', 'Action'));

store.dispatch(actions.addMovie('Avengers', 'Adventure'));

store.dispatch(actions.removeMovie(1));
