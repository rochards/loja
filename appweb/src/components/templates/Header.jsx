/**
 * Esse arquivo é importado em App.jsx
 */

import './Header.css'
import React from 'react'

// criando o componente funcional
export default props => 
    <header className="header">
        <a href={`${props.match.url}/home`}>
            <span className="font-weight-bold">
                <h4>
                    Sistema de Gerenciamento de Vendas
                </h4>
            </span>
        </a>
    </header>