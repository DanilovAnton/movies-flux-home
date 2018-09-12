import React, {Component} from "react"
import {hot} from "react-hot-loader"
import Main from "../containers/Main/Main"
import Movie from "../containers/Movie/Movie"
import MoviePreview from "../containers/MoviePreview/MoviePreview"
import "./style.scss"

import {Switch, Route} from 'react-router';

class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={Main}/>
                <Route exact path='/movie' component={Movie}/>
                <Route path='/movie/:id' component={MoviePreview}/>
                <Route path='/movie-edit/:id' component={Movie}/>
            </Switch>
        )
    }
}

export default hot(module)(App)

