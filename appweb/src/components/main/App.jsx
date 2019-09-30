/**
 * Esse arquivo é importado em index.js
 */
import './App.css'
//import 'bootstrap/dist/css/bootstrap.min.css'
//import 'font-awesome/css/font-awesome.min.css'
import React, { Component } from 'react'
import { Switch, Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'

import Nav from '../templates/Nav'
import Header from '../templates/Header'
import Footer from '../templates/Footer'
import Routes from '../main/Routes'
import Login from '../main/Login'

export default class App extends Component {
    
    render() {
        return (
            <React.Fragment>
                <BrowserRouter>
                    <Switch>    
                        <Route exact path = '/' component = { Login } /> 
                        <Route path = '/sgv' component = { Route1 } /> 
                    </Switch>
                </BrowserRouter>
            </React.Fragment>
        )
    }
}

const Route1 = ({ match }) => (
    <div className={'app'}>
        <Nav match={match}/>
        <Header  match={match}/>
        <Routes match={match} />
    </div>
)