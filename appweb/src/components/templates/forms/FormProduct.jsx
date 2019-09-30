/**
 * Esse arquivo é importado em Product.jsx
 */
import React, { Component } from 'react'
import CurrencyInput from 'react-currency-input';

export default class FormProduct extends Component {

    state = {
        ...this.returnInitialState(),
        fields: this.props.selectedProduct,
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ fields: nextProps.selectedProduct,
                        operation: nextProps.operation })
    }

    returnInitialState() {
        const initialState = {
            fields: {
                id: null,
                name: '',
                resume: '',
                price: '0.00',
                quantity: 100
            },
            errors: {
                name: '',
                price: '',
                quantity: ''
            },
            operation: 'search'
        }

        return initialState
    }

    validateFields() {

        let fields = this.state.fields
        let errors = this.state.errors
        let valid = true

        if (!fields.name) {
            errors.name = 'Nome é obrigatório'
            valid = false
        }
    
        if (fields.price <= 0) {
            errors.price = 'Preço deve ser maior que zero'
            valid = false
        }
    
        if (fields.quantity <= 0 ) {
            errors.quantity = 'Quantidade deve ser maior que zero'
            valid = false    
        }

        this.setState({ errors })

        return valid
    }

    handleClickSave() {
        
        if (this.validateFields()) {
            
            let operation = this.state.operation
            let product = this.state.fields
            if (typeof product.price === 'string') {
                product.price = product.price.replace(/\./g, '') // substitui . por espaço em branco
                product.price = product.price.replace(/\,/g, '.') // troca , por .
                product.price = parseFloat(product.price)
            }
            
            this.handleClickClear()
            
            this.props.handleClickSendForm({ product, operation }) // callback para Product.jsx

            this.setState({ operation: 'search' })
        }
    }

    handleClickSearch() {
        
        let operation = this.state.operation
        let product = this.state.fields

        this.props.handleClickSendForm({ product, operation })
    }

    handleChange(event) {
        
        let fields = this.state.fields
        fields[event.target.name] = event.target.value
        this.setState({ fields })
    }

    handleClickClear() {
        this.setState( {...this.returnInitialState()} )
    }

    render() {
        
        let fields = this.state.fields
        let errors = this.state.errors

        return (
            <React.Fragment>
                <div className="form ml-3 mr-3">
                    <hr/>
                    <div className="row">
                        <div className="col-4">
                            <div className="row"> 
                                <div className="form-group col-12">
                                    <label>Nome</label>
                                    <input type="text" className="form-control" name="name"
                                        placeholder="Digite o nome ..." value = { fields.name }
                                        onChange = { event => this.handleChange(event) } />
                                    <small  className="font-italic" style={ { color: "red" } }>
                                        { errors.name }
                                    </small>
                                </div>
                            </div>
                            <div className="row">
                                <div className={`form-group col-6 d-${ this.state.operation === 'save' ? 'show':'none' }`}>
                                    <label>Preço R$</label>
                                    <CurrencyInput className="form-control currency" name="price" decimalSeparator="," thousandSeparator="."
                                        placeholder="0,00" value = { fields.price }
                                        onChangeEvent = { event => this.handleChange(event) }
                                    />
                                    <small  className="font-italic" style={ { color: "red" } }>
                                        { errors.price }
                                    </small>
                                </div>
                                <div className={`form-group col-6 d-${ this.state.operation === 'save' ? 'show':'none' }`}>
                                    <label>Quantidade</label>
                                    <input type="number" min="0" className="form-control" name="quantity"
                                        placeholder="100" value = { fields.quantity }
                                        onChange = { event => this.handleChange(event) }/>
                                    <small  className="font-italic" style={ { color: "red" } }>
                                        { errors.quantity }
                                    </small>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label>Descrição do produto</label>
                                <textarea rows="5" className="form-control" name="resume"
                                    placeholder="Escreva uma breve descrição do produto ..."
                                    value = { fields.resume } 
                                    onChange = { event => this.handleChange(event) }></textarea>
                            </div>
                        </div>
                    </div>
                    <div className={ `row d-${ this.state.operation === 'search' ? 'inline':'none' }` }>
                        <div className="col-12 d-flex justify-content-end">
                            
                            <button className="btn btn-primary" name="search"
                                onClick = { () => this.handleClickSearch() }
                            >
                                <i className="fa fa-search"></i> 
                                Pesquisar
                            </button>
                            <button className="btn btn-secondary ml-2" name="clean"
                                onClick = { () => this.handleClickClear() }
                            >  
                                Limpar filtros
                            </button>
                        
                        </div>
                    </div>
                    <div className={ `row d-${ this.state.operation === 'save' ? 'inline':'none' }` }>
                        <div className="col-12 d-flex justify-content-end">
                            
                            <button className="btn btn-primary" name="save"
                                onClick = { () => this.handleClickSave() }
                            >
                                <i className="fa fa-save mr-1"></i> 
                                Salvar
                            </button>
                            <button className="btn btn-danger ml-2" name="clean"
                                onClick = { () => this.handleClickClear() }
                            >  
                                <i className="fa fa-ban mr-1"></i>
                                Cancelar
                            </button>
                        </div>
                    </div>
                    <div className={ `row d-${ this.state.operation === 'search' ? 'inline':'none' }` }>
                        <div className="col-12 mt-5 mb-1 d-flex justify-content-end">
                            <button type="button" className="btn btn-success"
                                onClick = { () => this.setState({ operation: 'save' }) }
                            >
                                <i className="fa fa-plus-circle mr-1"></i>Adicionar novo
                            </button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}