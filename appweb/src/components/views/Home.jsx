/**
 * Esse arquivo está sendo importado em Main.jsx
 */
import React, { Component } from 'react'

import Main from'../templates/Main'

export default class Home extends Component {

    componentDidMount() {

        const basicAuth = localStorage.getItem('auth')
        if (!basicAuth) {
            this.props.history.push('/')
        }
    }

    render() {
        return (
            <Main>
                <div className="welcome">
                    <h5>
                        Seja bem vindo!
                    </h5>
                    <hr/>
                    <h5>
                        Selecione uma das opções ao lado
                    </h5>
                </div>
            </Main>
        )
    }
}