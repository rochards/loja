/**
 * Esse arquivo é importado em Routes.jsx
 */
import React, { Component } from 'react'

import Main from '../templates/Main'
import FormCustomer from '../templates/forms/FormCustomer'
import Table from '../templates/tables/Table'
import axios from 'axios' // ????

const baseUrl = 'http://localhost:8080/api/customer'

// nome das colunas da tabela
const theadTable  = ['ID', 'Nome', 'CPF', 'Telefone', 'Email', 'Editar']

export default class Customer extends Component {
    
    state = { 
        customers: [],
        selectedCustomer: {
            id: null,
            name: '',
            cpf: '',
            fone: '',
            email: ''
        },
        operation: 'search'
    }

    componentDidMount() {
        const basicAuth = localStorage.getItem('auth')
        if (!basicAuth) {
            this.props.history.push('/')
        }
        this.setState({ basicAuth }, //definindo dinamicamente um state
            () => this.requestCustomers())
    }

    requestCustomers() {
        axios.get(baseUrl, {
            headers: { 'Authorization': this.state.basicAuth }
        })
            .then(response => this.setState({ customers: response.data }))
    }

    save(customer) {
        
        const method = customer.id ? 'put' : 'post'
        const url = customer.id ? `${baseUrl}/id/${customer.id}` : baseUrl
       
        axios[method](url, customer, {
            headers: { 'Authorization': this.state.basicAuth }
        })
            .then(() => this.requestCustomers())
    }

    getByCpf(cpf) {
        axios.get(`${baseUrl}/cpf/${cpf}`, {
            headers: { 'Authorization': this.state.basicAuth }
        })
            .then(response => {
                const customer = [response.data] // necessário para tornar em array
                this.setState({ customers: customer })
            })
    }

    getByName(name) {
        axios.get(`${baseUrl}/name/${name}`, {
            headers: { 'Authorization': this.state.basicAuth }
        })
            .then(response => this.setState({ customers: response.data }))
    }
    
    getDataForm = (data) => {

        const customer = data.customer
        if (data.operation === 'search') {
            if (customer.cpf) {
                this.getByCpf(customer.cpf)
            } else if (customer.name) {
                this.getByName(customer.name)
            }
        }
        else if (data.operation === 'save') {
            this.save(customer)
        }
    }

    getDataTable = (data) => {
        this.setState({ selectedCustomer: data,
                        operation: 'save' })
    }
    
    render() {
        return (
            <Main title="Clientes">
                <FormCustomer handleClickSendForm = { this.getDataForm } selectedCustomer = { this.state.selectedCustomer }
                 operation = { this.state.operation }/>
                <Table list = { this.state.customers } thTable = { theadTable } clickEdit = { this.getDataTable }/>
            </Main>
        )
    }
}
