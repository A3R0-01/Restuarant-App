import { useEffect, useState } from "react"
import FoodOrder from "./foodOrderList.component"
import { RequestData, setRequestToDefault } from "../../../Waiter redux elements/actions"
import { connect } from "react-redux"

const mapStateToProps = (state) => {
    return {
        CustomerSelected: state.WaiterAppData.CustomerSelected,
        isPending: state.RequestData.isPending,
        error: state.RequestData.error,
        FoodOrdersList: state.RequestData.dataRequested
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        SetFoodOrders: (url, body) => dispatch(RequestData(url, body)),
        SetDefault: () => dispatch(setRequestToDefault())
    }
}
const OrderCard = (props) => {
    const { order, CustomerSelected, FoodOrdersList, SetFoodOrders, SetDefault } = props

    const [showFoodOrders, setShow] = useState('SHOW MORE')
    const { OrderStatus, foodCount, totalPrice, OrderId } = order
    const [action, setAction] = useState(OrderStatus)
    const editOrderFunc = (edit) => {
        fetch('http://localhost:8000/order', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type: 'EditOrder',
                OrderId: OrderId,
                CustomerId: CustomerSelected.CustomerId,
                Edit: edit
            })
        }).then(response => response.json()).then(data => {
            alert(data)
            if (data === 'SUCCESSFUL') {
                setAction(edit)
            }
        })
    }


    useEffect(() => {
        if (showFoodOrders === 'SHOW LESS') {
            SetFoodOrders('http://localhost:8000/order', {
                type: 'read/foodOrders',
                OrderId: OrderId
            })
        } else {
            SetDefault()
        }

    }, [showFoodOrders])
    return (
        <div className='order'>
            <div className='orders-columns'>
                <div className='order-status ord-item'>{action}</div>
                <div className='food-order-count ord-item'>{foodCount}</div>
                <div className='total-price ord-item'>{totalPrice}</div>
            </div>
                <div className="ord-btns">
                        <div className='extend-btn' onClick={() => {
                            if (showFoodOrders === 'SHOW MORE') {
                                setShow('SHOW LESS')
                            } else {
                                setShow('SHOW MORE')
                            }
                        }}>{showFoodOrders}</div>
                        {
                    action === 'CURRENT'
                        ? <div className="ordering-button" onClick={() => editOrderFunc('IN-PROGRESS')} >ORDER</div>
                        : action === 'IN-PROGRESS'
                            ? <div className="ordering-button" onClick={() => editOrderFunc('CANCELLED')} >CANCEL</div>
                            : <div></div>
                }
                </div>
                {showFoodOrders === 'SHOW LESS'
                ?
                <div className='food-order-list'>
                    <div className="food-order food-order-heading">
                        <div className="food-order-item">Name</div>
                        <div className="food-order-item">Specification</div>
                        <div className="food-order-item">Quantity</div>
                        <div className="food-order-item">Price</div>
                    </div>
                    {FoodOrdersList.map((order) => {
                        return <FoodOrder foodOrder={order} />
                    })}
                </div>
                :<div></div>
                }
            <center>
            </center>
        </div>
    )
}
export default  connect(mapStateToProps, mapDispatchToProps)(OrderCard)