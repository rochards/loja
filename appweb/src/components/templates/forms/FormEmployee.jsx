/**
 * Arquivo é importado em  Employee.jsx 
 * 
 * Para utilizar os recursos do bootstrap, é necessário fazer 
 * um import lá no index.html
 */
import React, { Component } from 'react'
import InputMask from 'react-input-mask'

const initialState = Object.freeze ({
    fields: {
        id: null,
        name:'',
        cpf: '',
        fone: '',
        email: '',
        position: 'vendedor',
        username: '',
        password: ''
    },
    errors: {
        name: '',
        cpf: '',
        fone: '',
        email: '',
        username: '',
        password: ''
    },
    operation: 'search',
    showPassword: false
})

export default class FormCustomer extends Component {

    state = { ...initialState,
                fields: this.props.selectedEmployee
    }

    componentWillReceiveProps(newProps) {
        /**
         * selectedEmployee é uma propriedade vinda da tabela que está em Employee.jsx. Quando
         * o usuário clica no botão de editar da tabela, selectedEmployee é atualizado em Employee.jsx
         * e depois é carregado aqui nos campos do formulário
         */
        this.setState({ fields: newProps.selectedEmployee,
                        operation: newProps.operation 
        })
    }

    validateFields() {

        let operation = this.state.operation
        let fields = this.state.fields
        fields.cpf = fields.cpf.replace(/[\.\-_]/g, '') // retira . ou - ou _
        fields.fone = fields.fone.replace(/[\(.*\)\-_ ]/g,'') // retira () ou - ou _ por
        
        let errors = this.state.errors
        let valid = true
        
        if (!fields.name) {
            errors.name = 'Nome é obrigatório'
            valid = false
        }

        if (!fields.cpf) {
            errors.cpf = 'CPF é obrigatório'
            valid = false
        }
        else if (fields.cpf.length < 11) {
            errors.cpf = 'CPF incorreto'
            valid = false
        }

        if (!fields.fone) {
            errors.fone = 'Telefone é obrigatório'
            valid = false
        }
        else if (fields.fone && fields.fone.length < 11) {
            errors.fone = 'Telefone incorreto'
            valid = false
        }

        if (!fields.email) {
            errors.email = 'E-mail é obrigatório'
        }

        if (operation === 'save' && !fields.username) {
            errors.username = 'Username é obrigatório'
            valid = false
        }

        if (operation === 'save' && !fields.password) {
            errors.password = 'Senha é obrigatório'
            valid = false
        }

        this.setState({ errors })

        return valid
    }

    handleClickSave() {
        
        if (this.validateFields()) {

            let operation = this.state.operation
            let employee = this.state.fields
            employee.cpf = employee.cpf.replace(/[\.\-_]/g, '') // retira . ou - ou _ 
            employee.fone = employee.fone.replace(/[\(.*\)\-_ ]/g,'') // retira () ou - ou _ por

            if (!employee.position) {
                employee.position = 'vendedor'
            }

            this.handleClickClear()
            this.props.handleClickSendForm({ employee, operation })
        }  
    }

    handleClickSearch() {
        
        let operation = this.state.operation
        let employee = this.state.fields
        employee.cpf = employee.cpf.replace(/[\.\-_]/g, '') // retira . ou - ou _

        this.props.handleClickSendForm({ employee, operation })
    }

    handleChange(event) {
        
        let fields = this.state.fields
        fields[event.target.name] = event.target.value
        this.setState({ fields })
    }

    handleClickShowPassword() {

        const showPassword = this.state.showPassword ? false : true
        this.setState({ showPassword })
    }

    handleClickClear() {

        const fields = {
            id: null,
            name:'',
            cpf: '',
            fone: '',
            email: '',
            position: '',
            username: '',
            password: ''
        }
        const errors = {
            name: '',
            cpf: '',
            fone: ''
        }

        this.setState( { fields, errors, operation: 'search' } )
    }

    render() {

        let fields = this.state.fields
        let errors = this.state.errors

        return (
            <React.Fragment>
                <div className="form ml-3 mr-3 needs-validation" data-toggle="validator">
                    <hr/>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label>Nome</label>
                                <input type="text" className="form-control" name="name" 
                                    placeholder="Digite o nome..." value = { fields.name }
                                    onChange = { event => this.handleChange(event)}/> 
                                <small  className="font-italic" style={ { color: "red" } }>
                                    { errors.name }
                                </small>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="form-group">
                                <label>CPF</label>
                                <InputMask className="form-control" name="cpf" id="cpf" 
                                    mask="999.999.999-99" placeholder="Digite o cpf..." value={ fields.cpf }
                                    onChange = { event => this.handleChange(event) }
                                />
                                <small  className="font-italic" style={ { color: "red" } }>
                                    { errors.cpf }
                                </small>
                            </div>
                        </div>
                        <div className={ `col-3 d-${ this.state.operation === 'save' || this.state.operation === 'edit'  ? 'inline':'none' }` }>
                            <label>Telefone</label>
                            <InputMask className="form-control" name="fone" id="fone"
                                mask="(99) (99) 99999-9999" placeholder="Digite o telefone..." value = { fields.fone }
                                onChange = { event => this.handleChange(event) }
                            />
                            <small  className="font-italic" style={ { color: "red" } }>
                                { errors.fone }
                            </small>
                        </div>
                    </div>
                    <div className="row">
                        <div className={ `col-4 d-${ this.state.operation === 'save' || this.state.operation === 'edit' ? 'inline':'none' }` }>
                            <label>E-mail</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">@</div>
                                </div>
                                <input type="email" className="form-control" name="email" 
                                    placeholder="Digite o e-mail..." value = { fields.email }
                                    onChange = { event => this.handleChange(event)} 
                                />    
                            </div>
                            <small  className="font-italic" style={ { color: "red" } }>
                                { errors.email }
                            </small>
                        </div>
                        <div className={ `col-2 d-${ this.state.operation === 'save' || this.state.operation === 'edit' ? 'inline':'none' }` }>
                            <label>Cargo</label>
                            <div className="input-group">
                                <select name="position"className="form-control"
                                    onChange = { event => this.handleChange(event) }
                                >
                                    <option value="vendedor">Vendedor</option>
                                    <option value="gerente">Gerente</option>
                                </select>
                            </div>
                        </div>
                        <div className={ `col-3 d-${ this.state.operation === 'save' || this.state.operation === 'edit' ? 'inline':'none' }` }>
                            <label>Usuário</label>
                            <div className="input-group">
                                <input type="email" className="form-control" name="username" 
                                    placeholder="Digite o usuário..." value = { fields.username }
                                    onChange = { event => this.handleChange(event)} 
                                />
                            </div>
                            <small  className="font-italic" style={ { color: "red" } }>
                                { errors.username }
                            </small>
                        </div>
                        <div className={ `col-3 d-${ this.state.operation === 'save' || this.state.operation === 'edit' ? 'inline':'none' }` }>
                            <label>Senha</label>
                            <div className="input-group">
                                <input type = {this.state.showPassword ? 'text':'password'} 
                                    className="form-control" name="password" 
                                    placeholder="Digite o usuário..." value = { fields.password || '' }
                                    onChange = { event => this.handleChange(event)} 
                                />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-info" 
                                        onClick = { () => this.handleClickShowPassword() }
                                    >
                                        <i className={ `far fa-eye${ this.state.showPassword ? '-slash':'' }` }
                                        ></i>
                                    </button>
                                </div>
                            </div>
                            <small  className="font-italic" style={ { color: "red" } }>
                                { errors.password }
                            </small>
                        </div>
                    </div>
                    <hr />
                    <div className={ `row d-${ this.state.operation === 'search' ? 'inline':'none' }` }>
                        <div className="col-12 d-flex justify-content-end">
                            
                            <button className="btn btn-primary" 
                                onClick = { () => this.handleClickSearch() }
                            >
                                <i className="fa fa-search"></i> 
                                Pesquisar
                            </button>
                            <button className="btn btn-secondary ml-2"
                                onClick = { () => this.handleClickClear() }
                            >  
                                Limpar filtros
                            </button>
                        
                        </div>
                    </div>
                    <div className={ `row d-${ this.state.operation === 'save' || this.state.operation === 'edit' ? 'inline':'none' }` }>
                        <div className="col-12 d-flex justify-content-end">
                            
                            <button className="btn btn-primary" 
                                onClick = { () => this.handleClickSave() }
                            >
                                <i className="fa fa-save mr-1"></i> 
                                Salvar
                            </button>
                            <button className="btn btn-danger ml-2"
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