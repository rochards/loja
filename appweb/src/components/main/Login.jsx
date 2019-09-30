import React, { Component } from 'react'
import './Login.css'
import axios from 'axios'




export default class Login extends Component {

    state = {
        username: '',
        password: '',
        user: {},
        isAuthenticated: false,
        alert: 'none'
    }

    /**
     * essa lógica serve simplesmente para que o usuário seja redirecionado para
     * Home caso ele já esteja logado e tente acessar o login novamente
     */
    componentDidMount() { 
        let basicAuth = localStorage.getItem('auth')
        if (basicAuth) {
            this.props.history.push('/sgv/home')
        }
    }

    handleChange(event) {
        this.setState( { [event.target.name]: event.target.value })
    }

    handleSubmit() {

        if (this.state.username && this.state.password) {
            
            let username = this.state.username
            let password = this.state.password
            let basicAuth = 'Basic ' + btoa(username + ':' + password)
            
            axios.get('http://localhost:8080/api/getUser',  {
                headers: { 'Authorization': basicAuth }
            }).then(response => {
                
                localStorage.setItem('auth', basicAuth)
                
                this.setState({ isAuthenticated: true, // é necessário passar uma callback pq setState é assíncrono
                                user: response.data }, () => this.getUserByUsername(username, basicAuth))
                
                
            }).catch(error => {
                
                console.log(error.response)
                this.setState({ alert: 'show' })
            })
        } else {
             this.setState({ alert: 'show' })
        }
        /**
         * btoa -> Uses Buffer to emulate the exact functionality of the browser's btoa (except that it supports some 
         * unicode that the browser may not).
         *  It turns binary data to base64-encoded ascii.
                 
        * https://stackoverflow.com/questions/44072750/how-to-send-basic-auth-with-axios
        */
    }

    getUserByUsername(username, basicAuth) {
        
        axios.get(`http://localhost:8080/api/user/username/${username}`, {
            headers: { 'Authorization': basicAuth }
        }).then(response => {
            
            localStorage.setItem('userCpf', response.data.cpf)
            localStorage.setItem('userName', response.data.username)
            localStorage.setItem('userIsManager', response.data.manager)

            this.props.history.push('/sgv/home')
        })
    }

    form() {
        return (
            <div className="login" >
                    <div className="container align-self-center w-25 h-100">
                        <div className="shadow-sm p-3 mb-5 bg-white rounded" >
                            <div className="row d-flex justify-content-center">
                                <h1>Login</h1>
                            </div>
                            <div className= {`alert alert-danger d-${this.state.alert}`} role="alert">
                               Usuário/senha não encontrados
                            </div>
                            <div className="form-group ">
                                <label>Usuário</label>
                                <input type="text" className="form-control" placeholder="Informe seu usuário ..." required
                                    value = { this.state.username } onChange = { event => this.handleChange(event) }
                                    name="username"/>
                            </div>
                            <div className="form-group ">
                                <label>Senha</label>
                                <input type="password" className="form-control" placeholder="Informe sua senha ..."
                                    value = { this.state.password } onChange = { event => this.handleChange(event) }
                                    name="password"/>
                            </div>
                            
                                <button type="submit" className="btn btn-primary col-12"
                                    onClick = { () => this.handleSubmit() }
                                >Entrar</button>
                            
                        </div>
                    </div>
            </div>
        )
    }

    render() {
        //console.log(this.state.isAuthenticated)
        return (
            //this.renderPages()
            this.form()
        )
    }
}
