/**
 * Esse é importado em Form1.jsx
 */
import React, { Component } from 'react'

export default class Table extends Component {
    render() {
        return (
            <div className="col-12">
                <div className="row">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                {
                                    this.props.thTable.map(element => {
                                        return (
                                            <th key = { element }>{ element }</th>
                                        )
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            { 
                               this.props.list.map(element => {
                                    return (
                                        <tr key = { element.id }>
                                            <td>{ element.id }</td>
                                            {element.name ? <td>{element.name}</td> : null}
                                            {element.cpf ? <td>{`${element.cpf}`}</td> : null}
                                            {element.fone ? <td>{`${element.fone}`}</td> : null}
                                            {element.email ? <td>{`${element.email}`}</td> : null}
                                            {element.position ? <td>{`${element.position}`}</td> : null}
                                            {element.price ? <td>{`R$ ${
                                                                        element.price.toFixed(2).toString().replace('.', ',')
                                                                    }
                                                            `}</td> : null}
                                            {element.quantity ? <td>{`${element.quantity}`}</td> : null}
                                            {element.resume ? <td>{`${element.resume}`}</td> : null}
                                            {element.product ? <td>{`${element.product}`}</td> : null}
                                            {element.productPrice ? <td>{`R$ ${
                                                element.productPrice.toFixed(2).toString().replace('.', ',')
                                            }`}</td> : null}
                                            {element.productQuantity ? <td>{`${element.productQuantity}`}</td> : null}
                                            {element.salePrice ? <td>{`R$ ${
                                                element.salePrice.toFixed(2).toString().replace('.', ',')
                                            }`}</td> : null}
                                            {element.descount >=0 ? <td>{`R$ ${
                                                element.descount.toFixed(2).toString().replace('.', ',')
                                            }`}</td> : null}
                                            {element.customer ? <td>{`${element.customer}`}</td> : null}
                                            {element.employee ? <td>{`${element.employee}`}</td> : null}
                                            {element.dateTimeSale ? <td>{`${element.dateTimeSale}`}</td> : null}
                                            <td className={`d-${element.salePrice ? 'none' : 'inline'}`}>
                                                <div className="btn-group">
                                                    <button type="button" className="btn btn-warning"
                                                        onClick = { () => this.props.clickEdit && this.props.clickEdit(element) }
                                                    >
                                                        <i className="fas fa-edit"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}