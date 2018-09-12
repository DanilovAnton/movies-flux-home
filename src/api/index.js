import data from '../../data'
import MovieListStore from "../store";

let buffer = data;

export default {
    loadMovies() {
        return new Promise(resolve => {
            resolve(buffer)
        })
    },
    saveMovie(movie) {
        return new Promise(
            (resolve, reject) => {
                if (movie.id === null) {
                    const id = uniqueId(buffer.movies);
                    buffer.movies.unshift({...movie, id});
                    resolve({status: 'Ok', message: `Success`})
                } else {
                    const index = buffer.movies.findIndex(el => el.id === movie.id);
                    if (index !== -1) {
                        buffer.movies[index] = movie;
                        resolve({status: 'Ok', message: `Success`});
                    } else {
                        reject({status: 'error', message: `don't have movie`})
                    }
                }
            }
        )
    },
    getMovie(id) {
        return new Promise(
            (resolve, reject) => {
                const movie = buffer.movies.find(el => el.id === +id);
                if (movie) {
                    resolve(movie);
                } else {
                    reject({status: 'error', message: 'not found this movie'})
                }
            }
        )
    }
}

function uniqueId(movies) {
    let el;
    el = movies.reduce((previousValue, currentValue) => {
        if (currentValue.id > previousValue.id) {
            return currentValue
        }
        return previousValue
    });
    return el.id+1;
}