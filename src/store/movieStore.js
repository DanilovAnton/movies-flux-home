import {EventEmitter} from "events"
import AppDispatcher from "../dispatcher"
import ACTION_TYPES from "../constants"
import MovieListStore from "./index";

const EVENT = 'CHANGE_MOVE_STORE';


function Movie() {
    this.id = null;
    this.title = '';
    this.year = '';
    this.runtime = '';
    this.genres = [];
    this.director = '';
    this.actors = '';
    this.plot = '';
    this.posterUrl = '';
}

let store = {};


const MovieStore = Object.assign({}, EventEmitter.prototype, {
    getState() {
        return store
    },

    initialState() {
        store = {movie: new Movie(), response: {}};
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

MovieStore.dispatchToken = AppDispatcher.register(action => {
    switch (action.type) {

        case ACTION_TYPES.GET_MOVIE: {
            store.movie = action.payload;

            MovieStore.emitChange();
            break;
        }

        case ACTION_TYPES.GET_MOVIE_FAIL:
        case ACTION_TYPES.SAVE_MOVIE_FAIL:
        case ACTION_TYPES.SAVE_MOVIE: {
            store.response = action.payload;
            MovieStore.emitChange();
            break;
        }

        default: {

        }
    }
});


export default MovieStore;