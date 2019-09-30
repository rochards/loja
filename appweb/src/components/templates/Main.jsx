/**
 * Esse arquivo é importado em Home.jsx, Customers.jsx, Product.jsx
 */

import './Main.css'
import React from 'react'

export default props => 
    <React.Fragment> {/**renderiza os elementos sem envolve-los em uma tag html */}
        <main className="content">
            <div className="main-body">
                <h3 className="ml-3 mt-1">{props.title}</h3>
                {
                    /** pega toda a tag que vier de Home.jsx */
                    props.children 
                }
            </div>
        </main>
        {/** a tag main deve ser única e representa a parte principal da página */}
    </React.Fragment>