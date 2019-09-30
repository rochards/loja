import React, { Component } from 'react'

export default class Logout extends Component  {
    
    componentDidMount() {
        localStorage.clear()
        this.props.history.push('/')
    }

    render() {
        return (
            <React.Fragment>

            </React.Fragment>
        )
    }
}