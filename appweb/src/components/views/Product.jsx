/**
 * Esse arquivo é importado em Routes.jsx
 */
import React, { Component } from 'react'

import Main from '../templates/Main'
import Table from '../templates/tables/Table'
import FormProduct from '../templates/forms/FormProduct'
import axios from 'axios' // ????

const baseUrl = 'http://localhost:8080/api/product'

// nome das colunas da tabela
const theadTable  = ['ID', 'Nome', 'Preço', 'Estoque', 'Descrição do produto', 'Editar']
export default class Product extends Component {

    state = {
        products: [],
        selectedProduct: {
            id: null,
            name: '',
            resume: '',
            price: '0.00',
            quantity: 100
        },
        operation: 'search'
    }

    componentDidMount() {
        const basicAuth = localStorage.getItem('auth')
        if (!basicAuth) {
            this.props.history.push('/')
        }
        this.setState({ basicAuth }, //definindo dinamicamente um state
                    () => this.requestProducts())
    }

    requestProducts() {
        axios.get(baseUrl, { 
            headers: { 'Authorization': this.state.basicAuth }
        })
            .then(response => this.setState({ products: response.data }))
            .catch(error => console.log(error))
    }

    save(data) {

        const method = data.product.id ? 'put' : 'post'
        const url = data.product.id ? `${baseUrl}/id/${data.product.id}` : baseUrl
        const product = data.product

        axios[method](url, product, {
            headers: { 'Authorization': this.state.basicAuth }
        })
            .then(() => this.requestProducts())
    }

    getByName(name) {
        axios.get(`${baseUrl}/name/${name}`, {
            headers: { 'Authorization': this.state.basicAuth }
        })
            .then(response => this.setState({ products: response.data }))
            .catch(error => console.log(error))
    }

    getByResume(resume) {
        axios.get(`${baseUrl}/resume/${resume}`, {
            headers: { 'Authorization': this.state.basicAuth }
        })
            .then(response => this.setState({ products: response.data }))
            .catch(error => console.log(error))
    }

    getDataForm = (data) => {
        
        const product = data.product
        
        if (data.operation === 'search') {
            if (product.name) {
                this.getByName(product.name)
            } 
            else if (product.resume) {
                this.getByResume(product.resume)
            }
        }
        else if (data.operation === 'save') {
            this.save(data)
        }
        else if(data.operation === 'clean') {
            this.requestProducts()
        }
    }

    getDataTable = (data) => {
        this.setState({ selectedProduct: data, 
                        operation: 'save' })
    }

    render() {
        return (
            <Main title="Produtos">
                <FormProduct handleClickSendForm = { this.getDataForm } selectedProduct = { this.state.selectedProduct } 
                operation = { this.state.operation }/>
                <Table list = { this.state.products } thTable = { theadTable } clickEdit = { this.getDataTable }/>
            </Main>
        )
    }
}