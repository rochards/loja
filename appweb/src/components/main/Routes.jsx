/**
 * Esse arquivo é importado em App.jsx
 */
import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from '../views/Home'
import Customer from '../views/Customer'
import Employee from '../views/Employee'
import Product from '../views/Product'
import Sale from '../views/Sale'
import Report from '../views/Report'
import Logout from '../main/Logout'

export default props => 
    <Switch>
        <Route path = { `${props.match.url}/home` } component = { Home } />
        <Route path = { `${props.match.url}/customers` } component = { Customer } />
        <Route path = { `${props.match.url}/employees` } component = { Employee } />
        <Route path = { `${props.match.url}/products` } component = { Product } />
        <Route path = { `${props.match.url}/sales` } component = { Sale } />
        <Route path = { `${props.match.url}/reports` } component = { Report } />
        
        <Route path = { `${props.match.url}/logout` } component = { Logout } />
    </Switch>