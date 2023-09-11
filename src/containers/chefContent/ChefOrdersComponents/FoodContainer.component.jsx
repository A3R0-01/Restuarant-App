import { connect } from "react-redux"
import FoodOrdersComponent from "./FoodOrders.component"
import { RequestData } from "../../../Waiter redux elements/actions"
import { SetDefaultObjectToExpand } from "../../../Chef redux elements/actions"
import { useEffect } from "react"

const mapStateToProps = ({ ChefAppData }) => {
    return {
        OrderId: ChefAppData.ObjectToExpand,
        EmployeeData: ChefAppData.ChefData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        RefreshData: (body) => dispatch(RequestData('http://localhost:8001/orders', body)),
        Close: () => dispatch(SetDefaultObjectToExpand())

    }
}
const FoodContainer = (props) => {
    const { EmployeeData, OrderId, RefreshData, Close } = props
    // useEffect(() => {
    //     const present = document.querySelector(".chef-less-width-orders")
    //     if(present && !OrderId ){
    //         document.querySelector(".chef-order-list").classList.toggle("chef-less-width-orders")
    //     }else if(!present && OrderId!== 0){
    //         document.querySelector(".chef-order-list").classList.toggle("chef-less-width-orders")
    //     }
    // }, [OrderId])
    return (OrderId ?
        <div className="w-11/12 p-5 mx-auto">
                    <div className=" cursor-pointer m-auto mb-10 shadow-md w-fit p-3 shadow-green-500 text-3xl"                    onClick={() => RefreshData({
                        type: 'foodorders/read',
                        OrderId: OrderId,
                        EmployeeData: EmployeeData
                    })}>Refresh </div>
            <FoodOrdersComponent />
        </div>
        : <div className="hidden"></div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodContainer)