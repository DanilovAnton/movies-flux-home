import {Component} from "react";
import React from "react";
import Actions from "../../actions/index";
import MovieStore from "../../store/movieStore";
import {Link} from "react-router-dom"
import "./style.scss"

class MoviePreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...MovieStore.initialState()
        };
        Actions.loadMovies()
            .then(() => Actions.getMovie(props.match.params.id));
    }

    componentDidMount() {
        MovieStore.addChangeListener(this.updateState);
    }

    componentWillUnmount() {
        MovieStore.removeChangeListener(this.updateState);

    }

    updateState = () => {
        this.setState({...MovieStore.getState()})
    };

    render() {
        const state = this.state.movie;
        return (
            <div className="movie">
                <div className="wrapper-table">
                    <table className="film-table">
                        <tbody>
                        <tr>
                            <td>
                                image:
                            </td>
                            <td>
                                <div className="film-table__wrapper_image">
                                    <img src={this.state.movie.posterUrl} alt=""/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                title:
                            </td>
                            <td>
                                {state.title}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                year:
                            </td>
                            <td>
                                {state.year}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                runtime:
                            </td>
                            <td>
                                {state.runtime}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                genres:
                            </td>
                            <td>
                                {state.genres.join(', ')}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                director:
                            </td>
                            <td>
                                {state.director}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                plot:
                            </td>
                            <td>
                                {state.plot}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {this.state.response.message}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                    <div className="back">
                        <Link className="btn" to='/'>back</Link>
                    </div>
            </div>
        )
    }
}

export default MoviePreview;