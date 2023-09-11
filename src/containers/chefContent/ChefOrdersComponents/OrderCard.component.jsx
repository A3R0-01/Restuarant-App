import { connect } from "react-redux"
import { SetDefaultObjectToExpand, SetObjectToExpand, UpdateElement } from "../../../Chef redux elements/actions"
import FoodContainerComponent from "./FoodContainer.component"

const mapStateToProps = ({ ChefAppData }) => {
    return {
        EmployeeData: ChefAppData.ChefData,
        Error: ChefAppData.UpdateError,
        ObjectToExpand: ChefAppData.ObjectToExpand,
        Pending: ChefAppData.UpdatePending
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        SetObjectToExpand: (id, body) => dispatch(SetObjectToExpand(id, 'http://localhost:8001/orders', body)),
        Finish: (body) => dispatch(UpdateElement('http://localhost:8001/orders', body)),
        Close: () => dispatch(SetDefaultObjectToExpand())


    }
}

const OrderCard = (props) => {

    const {
        Error, Pending, order, SetObjectToExpand, EmployeeData, Refresh, Finish, ObjectToExpand, Close
    } = props
    const view = ObjectToExpand === order.OrderId
    let flipIcon
    if(view){
        flipIcon ='-rotate-90'
    }else{
        flipIcon = 'rotate-90'
    }
    const FinishOrder = () => {
        Finish({
            type: 'orders/finish',
            EmployeeData: EmployeeData,
            Id: order.OrderId
        })
        Refresh()
    }
    return (
        <div className="chef-parent-order w-full"
        >
            <div className="chef-order-card text-4xl rounded-xl">
                <div className="chef-order-component">{order.OrderId}</div>
                <div className="chef-order-component">Table: {order.TableId}</div>
                <div className="chef-order-component">x{order.foodCount}</div>
                <div className="chef-order-component">${order.totalPrice}</div>
                <div className="chef-order-component"
                >
                    <div onClick={() => FinishOrder()}
                        className="text-slate-50 w-60 border-b-red-500 rounded-xl border-solid border-b-2 cursor-pointer hover:shadow-md hover:shadow-slate-400"
                    >{order.OrderStatus}
                    </div></div>
            </div>
            <svg onClick={() => {
                if(!view){
                    SetObjectToExpand(order.OrderId, {
                        type: 'foodorders/read',
                        EmployeeData: EmployeeData,
                        OrderId: order.OrderId
                    })
                }else{
                    Close()
                }
                }
                }
                        className={` ${flipIcon} scale-125 m-auto cursor-pointer mb-4 fill-white hover:scale-150`} fill="#333" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" /><path d="M0-.25h24v24H0z" fill="none" /></svg>
            {
                view ?
                    <FoodContainerComponent />
                    : <div className="hidden"></div>
            }
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderCard)