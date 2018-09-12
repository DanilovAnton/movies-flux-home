import {EventEmitter} from "events"
import AppDispatcher from "../dispatcher"
import ACTION_TYPES from "../constants"

const EVENT = 'CHANGE_STORE';

function Movies() {
    this.movies = [];
}

let store = {};


const MovieListStore = Object.assign({}, EventEmitter.prototype, {
    getState() {
        return store
    },

    initialState() {
        store = new Movies();
        return store;
    },

    emitChange() {
        this.emit(EVENT);
    },

    addChangeListener(callback) {
        this.on(EVENT, callback);
    },

    removeChangeListener(callback) {
        this.removeListener(EVENT, callback);
    }
});

MovieListStore.dispatchToken = AppDispatcher.register(action => {
    switch (action.type) {
        case ACTION_TYPES.LOAD_MOVIES: {
            store = action.payload;
            MovieListStore.emitChange();
            break;
        }

        default: {
        }
    }
});


export default MovieListStore;