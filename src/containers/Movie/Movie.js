import React, {Component, Fragment} from "react"
import Actions from "../../actions/index"
import MovieStore from "../../store/movieStore"
import {Redirect} from "react-router"
import {Link} from "react-router-dom"
import "./style.scss"

class Movie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...MovieStore.initialState()
        };
        if (props.match.params.hasOwnProperty('id')) {
            Actions.getMovie(props.match.params.id);
        }

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

    handleChange = ({target: {name, value}}) => {
        if (name === 'genres') {
            this.setState({movie: {...this.state.movie, [name]: value.split(', ')}})
        } else {
            this.setState({movie: {...this.state.movie, [name]: value}})
        }
    };

    handleSubmit = e => {
        e.preventDefault();
        Actions.saveMovie(this.state.movie, () => this.props.history.push("/"));
    };

    render() {
        if (this.state.response.status === 'Ok') {
            return <Redirect to='/'/>
        }
        const state = this.state.movie;
        return (
            <div className="edit-movie">
                <form onSubmit={this.handleSubmit}>
                    <div className="wrapper-edit-table">
                        <table className="edit-table">
                            <tbody>
                            <tr>
                                <td>
                                    image: *
                                </td>
                                <td>
                                    <input required type="text" value={state.posterUrl} name="posterUrl"
                                           onChange={this.handleChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    title: *
                                </td>
                                <td>
                                    <input required type="text" value={state.title} name="title"
                                           onChange={this.handleChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    year:
                                </td>
                                <td>
                                    <input type="text" value={state.year} name="year" onChange={this.handleChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    runtime:
                                </td>
                                <td>
                                    <input type="text" value={state.runtime} name="runtime"
                                           onChange={this.handleChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    genres:
                                </td>
                                <td>
                                    <input type="text" value={state.genres.join(', ')} name="genres"
                                           onChange={this.handleChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    director:
                                </td>
                                <td>
                                    <input type="text" value={state.director} name="director"
                                           onChange={this.handleChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    plot: *
                                </td>
                                <td>
                                <textarea required value={state.plot} rows={3} name="plot"
                                          onChange={this.handleChange}/>
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
                    <div className="bottom">
                        <button className="btn">save</button>
                        <Link className="btn" to="/">cancel</Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default Movie;