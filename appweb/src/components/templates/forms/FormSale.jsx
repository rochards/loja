import React, {Component} from 'react'
import InputMask from 'react-input-mask'
import CurrencyInput from 'react-currency-input'
import axios from 'axios'

export default class FormSale extends Component {

    state = this.returnInitialState()

    returnInitialState() {

        const initialState = {
            products: [],
            customer: {},
            fields: {
                productId: null,
                productName: '',
                productPrice: '',
        
                customerName: '',
                customerCpf: '',
        
                saleQuantity: '',
                paymentMethod: 'dinheiro',
                saleDescount: '',
                salePrice: ''
            },
            errors: {
                productName: '',
                productPrice:'',
                customerName: '',
                saleQuantity: ''
            },
            showForm: false
        }

        return initialState
    }

   calculateSale() {
        
        const fields = this.state.fields
        let productPrice = fields.productPrice ? fields.productPrice : 0
        let saleQuantity = Number(fields.saleQuantity)
        //let saleDescount = fields.saleDescount.replace(',','.')
        let saleDescount = fields.saleDescount ? parseFloat(fields.saleDescount.replace('.','').replace(',','.')) : 0
        let salePrice = productPrice * saleQuantity - saleDescount
        salePrice = salePrice > 0 ? salePrice : 0

        //console.log(productPrice, saleQuantity, saleDescount)

        return salePrice
    }

    handleChange(event) {

        let fields = this.state.fields
        fields[event.target.name] = event.target.value
        this.setState({ fields })
    }

    handleSelect(event) {
        
        const input = event.target.value
        let match = []
        if (input) {
            match = input.match(/\d+/g)
        }

        if (match) {
            
            let fields = this.state.fields
            const product = this.state.products.filter(product => product.id == match[0])
            if (product[0]) {
                //console.log('product', product[0])
                fields.productId = product[0].id
                fields.productName = product[0].name
                fields.productPrice = product[0].price
                //console.log('fields', fields)
                this.setState({ fields })
            }
        }
    }


    validateFields() {
        
        const fields = this.state.fields
        const errors = this.state.errors
        let valid = true

        if (!fields.productPrice) {
            errors.productPrice = 'Não pode ser em branco'
            valid = false
        }

        if (!fields.customerName) {
            errors.customerName = 'Não pode ser em branco'
            valid = false
        }

        if (!Number(fields.saleQuantity) || Number(fields.saleQuantity) <=0 ) {
            errors.saleQuantity = 'Deve ser maior que zero'
            valid = false
        }

        //console.log('fields', fields)

        this.setState({ errors })
        
        return valid
    }

    handleClickSave() {
        
        if (this.validateFields()) {
            
            const fields = this.state.fields
            let sale = {
                productPrice: fields.productPrice,
                salePrice: this.calculateSale(),
                productQuantity: fields.saleQuantity,
                descount: fields.saleDescount ? parseFloat(fields.saleDescount.replace('.','').replace(',','.')) : 0,
                paymentMethod: fields.paymentMethod,
                idProduct: fields.productId,
                idCustomer: this.state.customer.id,
                idEmployee: 'nothing'
            }

            this.props.handleClickSendForm(sale)
        }
    }

    handleClickClear() {
        this.setState({ ...this.returnInitialState() })
    }

    getProductByName() {
        
        const name = this.state.fields.productName
        const basicAuth = localStorage.getItem('auth')

        axios.get(`http://localhost:8080/api/product/name/${name}`, {
            headers: { 'Authorization': basicAuth }
        })
            .then(response => {
                
                const products = response.data
                
                const errors = this.state.errors
                errors.productName = ''
                errors.productPrice = ''

                this.setState( { products, errors })
            })
            .catch( () => {
                
                const errors = this.state.errors
                errors.productName = 'Produto não encontrado'
                
                this.setState({ errors })
            })
    }

    getCustomerByCpf() {
        
        const cpf = this.state.fields.customerCpf.replace(/[\.\-_]/g, '') // retira . ou - ou _
        const basicAuth = localStorage.getItem('auth')

        axios.get(`http://localhost:8080/api/customer/cpf/${cpf}`, {
            headers: { 'Authorization': basicAuth }
        })
            .then(response => {
                
                const customer = response.data
                
                const errors = this.state.errors
                errors.customerName = ''
                
                const fields = this.state.fields
                fields.customerName = response.data.name
                
                this.setState({ customer, fields, errors })
            })
            .catch( () => {
                
                const errors = this.state.errors
                errors.customerName = 'Cliente não encontrado'

                this.setState({ errors })
            })
    }

    render() {

        const fields = this.state.fields
        const errors = this.state.errors

        return (
            <div className="form ml-3 mr-3">
                <hr/>   
                <div className={ `row d-${ this.state.showForm ? 'show': 'none' }` }>
                    <div className="col-6">
                        <div className="row">
                            <div className="form-group col-9">
                                <label>Produto</label>
                                <div className="input-group">
                                    <input list="products" type="text" className="form-control" name="productName"
                                        placeholder = "Digite o nome do produto..." value = { fields.productName }
                                        onChange = { event => {
                                            this.handleChange(event)
                                            this.handleSelect(event)
                                        } }
                                    />
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-secondary" type="button"
                                            onClick = { () => this.getProductByName() }
                                        >
                                            <i className="fa fa-search"></i>
                                        </button>
                                    </div>
                                    <datalist id = "products" >
                                        { 
                                            this.state.products.map(product => {
                                                return (
                                                    <option key = { product.id } 
                                                    value = { 'id = ' + product.id + ' - ' + product.name + ', R$ ' + 
                                                        product.price.toString().replace('.', ',') } />
                                                )
                                            }) 
                                        }
                                    </datalist>      
                                </div>
                                <small  className="font-italic" style={ { color: "red" } }>
                                        { errors.productName }
                                </small> 
                            </div>
                            <div className="form-group col-3">
                                <label>Preço R$</label>
                                <CurrencyInput className="form-control" name="productPrice" readOnly
                                    value = { fields.productPrice } decimalSeparator="," thousandSeparator="."
                                />
                                <small  className="font-italic" style={ { color: "red" } }>
                                        { errors.productPrice }
                                </small> 
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="row">
                            <div className="form-group col-5">
                                <label>CPF</label>
                                <div className="input-group">
                                    <InputMask className="form-control" name="customerCpf"
                                        mask="999.999.999-99" placeholder = "Digite o cpf..."
                                        value = { fields.customerCpf }
                                        onChange = { event => this.handleChange(event) }/>
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-secondary" type="button"
                                            onClick = { () => this.getCustomerByCpf() }>
                                            <i className="fa fa-search"></i>
                                        </button>
                                    </div>
                                </div> 
                            </div>
                            <div className="form-group col-7">
                                <label>Cliente</label>
                                <input type="text" className="form-control" name="customerName" readOnly
                                    value = { fields.customerName }
                                />
                                <small  className="font-italic" style={ { color: "red" } }>
                                    { errors.customerName }
                                </small> 
                            </div>
                        </div>
                    </div>
                </div>
                <div className={ `row d-${ this.state.showForm ? 'show': 'none' } mb-5` }>
                    <div className="col-6">
                        <div className="row">
                            <div className="form-group col-3">
                                <label>Quantidade</label>
                                <input type="number" min="0"className="form-control" name="saleQuantity" 
                                    value = { fields.saleQuantity }
                                    onChange = { event => this.handleChange(event) }/> 
                                <small  className="font-italic" style={ { color: "red" } }>
                                        { errors.saleQuantity }
                                </small> 
                            </div>
                            <div className="form-group col-6">
                                <label>Forma de pagamento</label>
                                <select name="paymentMethod"className="form-control"
                                    value = { fields.paymentMethod }
                                    onChange = { event => this.handleChange(event) }
                                >
                                    <option value = "dinheiro">Dinheiro</option>
                                    <option value = "credito">Crédito</option>
                                    <option value = "debito">Débito</option>
                                </select> 
                            </div>
                            <div className="form-group col-3">
                                <label>Desconto R$</label>
                                <CurrencyInput  className="form-control" name="saleDescount" 
                                    value = { fields.saleDescount } placeholder="0,00" 
                                    decimalSeparator="," thousandSeparator="."
                                    onChangeEvent = { event => this.handleChange(event) }
                                /> 
                            </div>
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="row">
                            <div className="form-group col">
                                <label className="text-danger">
                                    <strong>Total da venda R$</strong>
                                </label>
                                <CurrencyInput className="form-control text-danger" name="salePrice" readOnly
                                    value = { 
                                        fields.saleQuantity ? this.calculateSale() : ''
                                     }
                                    decimalSeparator="," thousandSeparator="."
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-4 d-flex justify-content-end">
                        <button className="btn btn-primary mt-5"
                            onClick = { () => this.handleClickSave() }>
                            <i className="fas fa-cart-arrow-down mr-1"></i> 
                            Finalizar
                        </button>
                        <button className="btn btn-danger ml-2 mt-5"
                            onClick = { () => this.handleClickClear() } >  
                            <i className="fa fa-ban mr-1"></i>
                            Cancelar
                        </button>
                    </div>
                </div>
                <div className={ `row d-${ this.state.showForm ? 'none': 'show' }` }>
                    <div className="col-12 mb-3 d-flex justify-content-end">
                        <button type="button" className="btn btn-success" 
                            onClick = { () => this.setState({ showForm: true }) } >
                            <i className="fa fa-plus-circle mr-1"></i>Nova venda
                        </button>
                    </div>
                </div>
            </div>    
        )
    }
}