import { connect } from "react-redux"
import { GetChefOrders } from "../../../Chef redux elements/actions"
import OrderCardComponent from "./OrderCard.component"
import { useEffect } from "react"
import FoodContainerComponent from "./FoodContainer.component"


const mapStateToProps = ({ ChefAppData, RequestData }) => {
    return {
        EmployeeData: ChefAppData.ChefData,
        OrdersPending: ChefAppData.OrdersPending,
        Orders: ChefAppData.Orders,
        OrdersError: ChefAppData.OrdersError,
        SortBy: ChefAppData.SortBy,
        Dishes: RequestData.dataRequested,
        DishesPending: RequestData.isPending,
        DishesError: RequestData.error

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        GetChefOrders: (body) => dispatch(GetChefOrders(body)),
    }
}
const OrdersList = (props) => {
    const {
        EmployeeData, OrdersPending, OrdersError, Orders, GetChefOrders, SortBy,
    } = props
    const getList = () => GetChefOrders({
        type: 'orders/read',
        EmployeeData: EmployeeData,
        SortBy: SortBy
    }
    )
    useEffect(() => {
        getList()
    }, [SortBy])
    useEffect(() => {
        getList()
    }, [])

    if (OrdersPending) {
        return (
            <h1 className="text-center">Pending</h1>
        )
    } else if (OrdersError) {
        return (
            <h1 className="text-center">An Error Occured</h1>
        )
    } else {
        return (
            <div className="">
                <div className="bg-slate-700 hover:bg-slate-500 text-white rounded-lg w-fit p-4 ml-auto mt-6 mb-6 border-solid border-1 border-white shadow-md shadow-slate-400 mr-auto text-4xl text-center hover:cursor-pointer" onClick={() => getList()}>Refresh</div>
                <div className="chef-order-list bg-zinc-800 opacity-90 p-6">
                    {Orders.map(order => {
                        return <OrderCardComponent order={order} Refresh={getList} />
                    })}
                </div>

            </div>

        )
    }


}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersList)