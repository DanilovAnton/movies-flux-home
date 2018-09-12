import AppDispatcher from "../dispatcher"
import type from "../constants"
import api from "../api"

const Actions = {
    loadMovies: function () {
        return api.loadMovies()
            .then(response => {
                AppDispatcher.dispatch({
                    type: type.LOAD_MOVIES,
                    payload: response
                });
            })
            .catch(error =>
                AppDispatcher.dispatch({
                    type: type.LOAD_MOVIES_FAIL,
                    payload: error
                })
            )
    },

    saveMovie: function (movie) {
        return api.saveMovie(movie)
            .then(respone => {
                    AppDispatcher.dispatch({
                        type: type.SAVE_MOVIE,
                        payload: respone
                    });
                }
            )
            .catch(error =>
                AppDispatcher.dispatch({
                    type: type.SAVE_MOVIE_FAIL,
                    payload: error
                })
            )

    },

    getMovie: function (id) {
        return api.getMovie(id)
            .then(response => {
                AppDispatcher.dispatch({
                    type: type.GET_MOVIE,
                    payload: response
                });
            })
            .catch(error =>
                AppDispatcher.dispatch({
                    type: type.GET_MOVIE_FAIL,
                    payload: error
                })
            )
    }

};

export default Actions;