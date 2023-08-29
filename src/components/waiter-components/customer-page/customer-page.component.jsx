import { useState, useEffect } from 'react';
import './customerPage.styles.css'
import { connect } from 'react-redux';
import { setClearanceData, SetCustomer, setPageName } from '../../../Waiter redux elements/actions';

const mapStateToProps = (state) => {
    return {
        TableSelected: state.WaiterAppData.TableSelected,
        CustomerSelected: state.WaiterAppData.CustomerSelected,
        ClearanceData: state.RequestClearanceData.dataRequested[0],
        isPending: state.RequestClearanceData.isPending,
        error: state.RequestClearanceData.error,
        EmployeeData: state.WaiterAppData.EmployeeData

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        SetCustomer: (data) => dispatch(SetCustomer(data)),
        SetPageName: (text) => dispatch(setPageName(text)),
        // GetClearanceData: (url, body) => dispatch(setClearanceData(body))
    }
}

const CustomerPage = (props) => {
    const { TableSelected,
        EmployeeData,
        CustomerSelected,
        SetCustomer,
        SetPageName,
        // GetClearanceData,
        ClearanceData,
        isPending,
        error
    } = props
    const [customerName, setCustomerName] = useState('')
    const CustomerFunction = (type = 'create') => {
        fetch('http://localhost:8000/customer', {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                EmployeeData: EmployeeData,
                type: type,
                tableId: TableSelected.TableId,
                CustomerName: customerName
            })
        }).then(response => response.json()).then(data => SetCustomer(data))
    }
    // useEffect(()=> {
    //     if (CustomerSelected !== 'nothing') {
    //         GetClearanceData('http://localhost:8000/RequestClearance',{
    //             CustomerId: CustomerSelected.CustomerId
    //         })
    //     }
    // }, [CustomerSelected])
    useEffect(() => {
        CustomerFunction('read')
        console.log(CustomerSelected)
    }, []);
    console.log(ClearanceData)
    return (
        <section className="section-plans" id="section-plans">
            <div className="u-center-text u-margin-bottom-big">
                <h2 className="heading-secondary">
                    CUSTOMER PAGE
                </h2>
            </div>

            {
                CustomerSelected === 'nothing' ?
                    <center className='customer-reg-form'>
                        <label htmlFor="">Enter Customer Name</label><br />
                        <input type="text" placeholder='Enter Name' onChange={(event) => setCustomerName(event.target.value)} /><br />
                        <button onClick={() => CustomerFunction()}>Submit</button>
                    </center>
                    :
                    <div>
                        <div className='row'>

                            <div className="col-1-of-3">
                                <div className="card">
                                    <div className="card__side card__side--front-1">
                                        <div className="card__title card__title--1">
                                            <i className="fas fa-paper-plane"></i>
                                            <h4 className="card__heading">Customer Data</h4>
                                        </div>

                                        <div className="card__details">
                                            <ul>
                                                <li>Customer Name: {CustomerSelected.CustomerName}</li>
                                                <li>Date Arrived: {CustomerSelected.DateArrived}</li>
                                                <li>Time Arrived: {CustomerSelected.TimeArrived}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-1-of-3">
                                <div class="card">
                                    <div class="card__side card__side--front-2">
                                        <div class="card__title card__title--2">
                                            <h4 class="card__heading">Clearance Form</h4>
                                        </div>
                                        <div class="card__details clearance-form">
                                        { isPending? <h1>Loading</h1>
                                        : error === 'UNSUCCESSFUL' || ClearanceData === 'nothing'?
                                        <h4 class="card__heading">N/A</h4>
                                        : <ul>
                                            <li>Customer Name: {ClearanceData.CustomerName}</li>
                                            <li>Total Cost: {ClearanceData.PriceToPay}</li>
                                            </ul>
                                        }
                                            </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div onClick={() => SetPageName('categories')} className="u-center-text u-margin-top-huge">
                            <a href="#dk" className="btn btn--green">Start Ordering</a>
                        </div>
                    </div>
            }
        </section>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerPage);