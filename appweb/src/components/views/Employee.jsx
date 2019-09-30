/**
 * Esse arquivo é importado em Routes.jsx
 */
import React, { Component } from 'react'

import Main from '../templates/Main'
import FormEmployee from '../templates/forms/FormEmployee'
import Table from '../templates/tables/Table'
import axios from 'axios' // ????

const baseUrlEmployee = 'http://localhost:8080/api/employee'
const baseUrlUser = 'http://localhost:8080/api/user'
// nome das colunas da tabela
const theadTable  = ['ID', 'Nome', 'CPF', 'Telefone', 'Email', 'Cargo','Editar']

export default class Employee extends Component {

    state = { 
        employees: [],
        selectedEmployee: {
            id: null,
            name: '',
            cpf: '',
            fone: '',
            email: '',
            position: ''
        },
        user: {},
        operation: 'search'
    }

    componentDidMount() {
        
        const basicAuth = localStorage.getItem('auth')
        if (!basicAuth) {
            this.props.history.push('/')
        }
        this.setState({ basicAuth }, // definindo dinamicamente um state
            () => this.requestEmployees())
    }

    requestEmployees() {
        axios.get(baseUrlEmployee, {
            headers: { 'Authorization': this.state.basicAuth }
        })
            .then(response => this.setState({ employees: response.data }))
            .catch(error => console.log(error))
    }

    save(data) {

        const methodEmployee = data.employee.id ? 'put' : 'post'
        const urlEmployee = data.employee.id ? `${baseUrlEmployee}/id/${data.employee.id}` :  baseUrlEmployee
        const employee = {
            cpf: data.employee.cpf,
            name: data.employee.name,
            fone: data.employee.fone,
            email: data.employee.email,
            position: data.employee.position
        }
        axios[methodEmployee](urlEmployee, employee, {
            headers: { 'Authorization': this.state.basicAuth }
        })
            .then(
                () => {

                    this.requestEmployees()
                    
                    const methodUser = methodEmployee === 'put' ? 'put' : 'post'
                    const urlUser = methodEmployee === 'put' ? `${baseUrlUser}/cpf/${data.employee.cpf}` : baseUrlUser
                    const user = {
                        cpf: data.employee.cpf,
                        username: data.employee.username,
                        password: data.employee.password,
                        manager: data.employee.position === 'gerente' ? true : false
                    }
                    
                    axios[methodUser](urlUser, user, {
                        headers: { 'Authorization': this.state.basicAuth }
                    })
                        .then(() => console.log('employee, usuário cadastrado/atualizado com sucesso'))
                        .catch(error => console.log(error))
                }
            )
            .catch(error => console.log(error))
    }

    getByCpf(cpf) { // busca empregado pelo cpf
        
        axios.get(`${baseUrlEmployee}/cpf/${cpf}`, {
            headers: { 'Authorization': this.state.basicAuth }
        })
            .then(response => {
                const employee = [response.data] // necessário para tornar em array
                this.setState({ employees: employee })
            })
            .catch(error => console.log(error))
    }

    getByName(name) { // busca empregado pelo nome
        axios.get(`${baseUrlEmployee}/name/${name}`, {
            headers: { 'Authorization': this.state.basicAuth }
        })
            .then(response => this.setState({ employees: response.data }))
            .catch(error => console.log(error))
    }

    getDataForm = (data) => {

        if (data.operation === 'search') {
            if (data.employee.cpf) {
                this.getByCpf(data.employee.cpf)
            }
            else if (data.employee.name) {
                this.getByName(data.employee.name)
            }
        }
        else if (data.operation === 'save' || data.operation === 'edit') {
            this.save(data)
        }
    }

    getDataTable = (data) => {
        this.setState({ selectedEmployee: data,
                        operation: 'edit' })
    }

    render() {
        return (
            <Main title="Funcionários">
                <FormEmployee handleClickSendForm = { this.getDataForm } selectedEmployee = { this.state.selectedEmployee }
                    operation = { this.state.operation }/>
                <Table list = { this.state.employees } thTable = { theadTable } clickEdit = { this.getDataTable }/>
            </Main>
        )
    }
}
    