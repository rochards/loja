/**
 * Esse arquivo é importado em Routes.jsx
 */
import React, { Component } from 'react'
//import ReactExport from 'react-data-export'

import Main from '../templates/Main'
import FormSale from '../templates/forms/FormSale'
import Table from '../templates/tables/Table'
import axios from 'axios'

const baseUrlEmployee = 'http://localhost:8080/api/employee'
const baseUrlSale = 'http://localhost:8080/api/sale'
const baseUrlProduct = 'http://localhost:8080/api/product'


// nome das colunas da tabela
const theadTable  = ['ID', 'Produto', 'Preço', 'Quantidade comprada', 'Valor da venda', 'Desconto', 'Cliente', 'Vendedor', 'Data da venda']
export default class Sale extends Component {
    
    state = {
        sales: []
    }

    componentDidMount() {

        const basicAuth = localStorage.getItem('auth')
        if (!basicAuth) {
            this.props.history.push('/')
        }
        
        this.setState({ basicAuth },
            () => this.requestSales()) //definindo dinamicamente um state
    }

    requestSales() {

        /**
         * Essa lógica da url implementada abaixo serve para que quando o empregado for um vendedor,
         * seja mostrado na tela de vendas apenas ssuas vendas.
         */
        const isMaganger = localStorage.getItem('userIsManager') === 'true' ? true : false
        const cpf = localStorage.getItem('userCpf')
        const url = isMaganger ? baseUrlSale : `${baseUrlSale}/employee/cpf/${cpf}` 

        axios.get(url, {
            headers: { 'Authorization': this.state.basicAuth }
        })
            .then(response => this.setState({ sales: response.data }))
            .catch(error => console.log(error))
    }

    save(data) {

        
        const cpf = localStorage.getItem('userCpf')
        axios.get(`${baseUrlEmployee}/cpf/${cpf}`, { // requisita o id do employee passando o cpf
            headers: { 'Authorization': this.state.basicAuth }
        })
            .then(response => {

                let sale = data
                sale.idEmployee = response.data.id
                
                //console.log('sale.idEmployee', sale.idEmployee)
                //console.log(sale)

                axios.get(`${baseUrlProduct}/id/${sale.idProduct}`, {
                    headers: { 'Authorization': this.state.basicAuth }
                })
                    .then(response => {
                        const product = response.data
                        
                        if (product.quantity >= product.quantity - sale.productQuantity) {
                            
                            axios.post(baseUrlSale, sale, { // aqui de fato faz a venda
                                headers: { 'Authorization': this.state.basicAuth }
                            })
                                .then(() => this.requestSales())
                                .catch(error => console.log(error))
                            
                            product.quantity = product.quantity - sale.productQuantity
                            axios.put(`${baseUrlProduct}/id/${product.id}`, product, { // aqui atualiza o estoque
                                headers: { 'Authorization': this.state.basicAuth }
                            })
                                .then(() => console.log('atualizacao de estoque'))
                                .catch(error => console.log(error))
                        }
                    })
                    .catch(error => console.log(error))

                
            })
            .catch(error => console.log(error))
    }

    getEmployeeByCpf(cpf) { // busca empregado pelo cpf
        
        axios.get(`${baseUrlEmployee}/cpf/${cpf}`, {
            headers: { 'Authorization': this.state.basicAuth }
        })
            .then(response => this.setState({ idEmployee: response.data.id }))
            .catch(error => console.log(error))
    }

    getDataForm = (data) => {
        this.save(data)
    }

    /*download() {
        
        const ExcelFile = ReactExport.ExcelFile;
        const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
        const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
        const data = this.state.sales

        return (
            <ExcelFile>
                <ExcelSheet data = { data } name = "Sales">
                    <ExcelColumn label = "ID do produto" value = "id" />
                    <ExcelColumn label = "Preço do produto" value = "productPrice" />
                    <ExcelColumn label = "Total da venda" value = "salePrice" />
                    <ExcelColumn label = "Quantidade de produtos comprados" value = "productQuantity" />
                    <ExcelColumn label = "Desconto em R$ sobre a venda" value = "descount" />
                    <ExcelColumn label = "Forma de pagamento" value = "paymentMethod" />
                    <ExcelColumn label = "Data da venda " value = "dateTimeSale" />
                    <ExcelColumn label = "Nome do produto" value = "product" />
                    <ExcelColumn label = "Nome do cliente" value = "customer" />
                    <ExcelColumn label = "Nome do funcionário" value = "employee" />
                </ExcelSheet>
            </ExcelFile>
        )
    }*/

    render() {
        
//m        console.log('storage', localStorage.getItem('userCpf'))
        console.log('state id', this.state.idEmployee)
        return (
            <Main title="Vendas">
                <FormSale handleClickSendForm = { this.getDataForm } />
                <Table list = { this.state.sales } thTable = { theadTable } />
            </Main>
        )
    }
}