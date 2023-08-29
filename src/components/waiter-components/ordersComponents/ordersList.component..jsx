import { useState, useEffect } from 'react'
import OrderCard from './orderCard.component'
import './orders.styles.css'

const OrdersList = (props) => {
    const [orders, setOrders] = useState([])
    const { customerData } = props
    useEffect(() => {
        fetch('http://localhost:8000/order', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type: 'read/orders',
                CustomerId: customerData.CustomerId
            })
        }).then(response => response.json()).then(data => {
            if (data === 'UNSUCCESSFUL') {
                alert('An Error Occurred')
            } else {
                setOrders(data)
            }
        })
    }, [])
    return (
        <center>
            <div className='orders-list'>

                <div className='orders-columns orders-headings'>
                    <div className='ord-item'>ORDER STATUS</div>
                    <div className='ord-item'>NUMBER OF ITEMS</div>
                    <div className='ord-item'>TOTAL PRICE</div>
                </div>
                <hr />
                {orders.map((order) => {
                    return (
                        <OrderCard order={order} customerData={customerData} />
                    )
                })}
            </div>
        </center>

    )

}

export default OrdersList