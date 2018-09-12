import React, {Component, Fragment} from "react"
import Actions from "../../actions/index"
import MovieListStore from "../../store/index"
import Film from "../../components/film/Film"
import {Link} from 'react-router-dom'
import "./style.scss"

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...MovieListStore.initialState()
        };
        Actions.loadMovies()
    }

    componentDidMount() {
        MovieListStore.addChangeListener(this.updateState);
    }

    componentWillUnmount() {
        MovieListStore.removeChangeListener(this.updateState);

    }

    updateState = () => {
        this.setState({...MovieListStore.getState()})
    };

    render() {
        const {movies} = this.state;

        return (
            <Fragment>
                <h3>MOVIES</h3>
                <div className="add-movie">

                    <Link className="add-movie__button" to="/movie">add new movie</Link>
                </div>
                <hr/>
                <div className="content">
                    <div className="film__list">
                        {movies.map(el =>
                            <Film
                                key={el.id}
                                id={el.id}
                                title={el.title}
                                year={el.year}
                                runtime={el.runtime}
                                genres={el.genres}
                                director={el.director}
                                plot={el.plot}
                            />
                        )}
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Main