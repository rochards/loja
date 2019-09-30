/**
 * Esse arquivo é importado em App.jsx
 */

 //https://javascript.info/async-await
import './Nav.css'
import React, { Component } from 'react'

const userIsManager = localStorage.getItem('userIsManager')

export default class Nav extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showNavs: userIsManager === 'true' ? true : false
        }
    }

    componenDidMount() {
        
        this.setState({ 
            showNavs: userIsManager === 'true' ? true : false
         })
    }

    render() {
        console.log(userIsManager)
        return (
            <aside className="menu-area">
                <nav className="menu">
                    <a href={`${this.props.match.url}/home`} className="mt-5">
                        <i className="fa fa-home mr-1"></i>
                        Início
                    </a>
                    <a href={`${this.props.match.url}/customers`}>
                        <i className="fa fa-user mr-1"></i>
                        Clientes
                    </a>
                    <a href={`${this.props.match.url}/employees`} 
                        className = {` ${ this.state.showNavs ? 'd-show' : 'd-none' }` }>
                        <i className="fas fa-user-tie mr-1"></i>
                        Funcionários
                    </a>
                    <a href={`${this.props.match.url}/products`}>
                        <i className="fas fa-box-open mr-1"></i>
                        Produtos
                    </a>
                    <a href={`${this.props.match.url}/sales`}>
                        <i className="fas fa-shopping-cart mr-1"></i>
                        Vendas
                    </a>
                    <a href={`${this.props.match.url}/reports`}
                        className = {` ${ this.state.showNavs ? 'd-show' : 'd-none' }` }>
                        <i className="fas fa-file-excel mr-1"></i>
                        Relatórios
                    </a>
        
                    <a href={`${this.props.match.url}/logout`} className="mt-4">
                    <i className="fas fa-sign-out-alt mr-1"></i>
                        Sair
                    </a>
                </nav>
            </aside>
        )
    }
}