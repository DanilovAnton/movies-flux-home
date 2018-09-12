import React, {Component} from "react"
import {Link} from "react-router-dom"
import "./film.scss"

const Film = ({id, title, year, runtime, genres, director, plot}) => {
    return (
        <div className="wrapper">
            <div className="film">
                <div className="film__title">
                    <div className="film__link">
                        <Link className="title__link" to={`/movie/${id}`}>{title}</Link>
                        <Link className="edit__link" to={`/movie-edit/${id}`}>edit</Link></div>
                </div>
                <div className="film__year"><span style={{textDecoration: 'underline'}}>Year</span>: {year}</div>
                <div className="film__runtime"><span style={{textDecoration: 'underline'}}>Runtime</span>: {runtime} min
                </div>
                <div className="film__genres"><span
                    style={{textDecoration: 'underline'}}>Genres</span>: {genres.join(', ')}
                </div>
                <div className="film__director"><span style={{textDecoration: 'underline'}}>Director</span>: {director}
                </div>
                <div className="film__plot"><span
                    style={{textDecoration: 'underline'}}>Plot</span>: {`${plot.split(' ').slice(0, 10).join(' ')}...`}
                </div>
            </div>
        </div>
    )
};
export default Film