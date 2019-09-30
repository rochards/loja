import React, { Component } from 'react'

import Main from '../templates/Main'
import { Bar } from 'react-chartjs-2'
import axios from 'axios'

const baseUrl = 'http://localhost:8080/api/report'

const _ = require('lodash');

const BarGraph = (props) => {

    const data = {
        labels: props.labels.map(element => { return element }),
        datasets: [
          {
            label: props.title,
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: props.data
          }
        ]
      }

    return (
        <Bar data = { data }  />
    )
}

export default class Report extends Component {

    state = {
        reports: [],
        graphSaleByDay: {
            labels:[],
            data: []
        },
        graphSaleByMethod: {
            labels:[],
            data: []
        }
    }

    componentDidMount() {
        
        const basicAuth = localStorage.getItem('auth')
        if (!basicAuth) {
            this.props.history.push('/')
        }
        this.setState({ basicAuth }, //definindo dinamicamente um state
                    () => this.requestReport())
    }

    requestReport() {
        axios.get(baseUrl, {
            headers: { 'Authorization': this.state.basicAuth }
        })
            .then(response => this.setState({ reports: response.data },
                        () => {
                            this.groupReportByDate()
                            this.groupReportByPaymentMethod()
                            }
                        )
            )
    }

    groupReportByDate() {

        let graphSaleByDay = this.state.graphSaleByDay
        graphSaleByDay.data = Object.values(_.countBy(this.state.reports, 'dateTimeSale'))
        graphSaleByDay.labels = Object.keys(_.countBy(this.state.reports, 'dateTimeSale'))

        this.setState({ graphSaleByDay })
    }

    groupReportByPaymentMethod() {

        let graphSaleByMethod = this.state.graphSaleByMethod
        graphSaleByMethod.data = Object.values(_.countBy(this.state.reports, 'paymentMethod'))
        graphSaleByMethod.labels = Object.keys(_.countBy(this.state.reports, 'paymentMethod'))

        this.setState({ graphSaleByMethod })
    }

    render() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
        //console.log(this.state.graphSaleByDay)
        return (
            <Main title='Dashboard'>
            
                <hr/>
                <div className="row">
                   <div className="col-6">
                        <BarGraph title = { 'Vendas diárias' } labels = { this.state.graphSaleByDay.labels } 
                            data = { this.state.graphSaleByDay.data }/>
                   </div>
                   <div className="col-6">
                        <BarGraph  title = { 'Vendas por forma de pagamento' } 
                            labels = { this.state.graphSaleByMethod.labels } 
                            data = { this.state.graphSaleByMethod.data }/>
                   </div>
                </div>
            </Main>
        )
    }
}