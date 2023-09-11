import { connect } from "react-redux"
import { SetDefaultObjectToExpand } from "../../../Chef redux elements/actions"

const mapStateToProps = ({ChefAppData, RequestData}) => {
    return{
        Dishes: RequestData.dataRequested,
        DishesPending: RequestData.isPending,
        DishesError: RequestData.error,
        EmployeeData: ChefAppData.ChefData,
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
    }
}

const FoodOrders = (props) => {

    const {Dishes, DishesError, DishesPending, EmployeeData} = props

    if (DishesPending){
        return <div className="grid place-items-center xl:text-7xl lg:text-6xl md:text-5xl sm: text-4xl text-slate-500">Pending</div>
    }else if(DishesError.length){
        return <div className="grid place-items-center xl:text-7xl lg:text-6xl md:text-5xl sm: text-4xl text-slate-500"></div>
    }else{
        return (
            <ul className="">
                {
                    Dishes.map(dish => {
                        return(
                            <li className="grid grid-cols-6 border-b-2 border-slate-400 border-solid text-3xl mb-4 p-3">
                                <div className="col-span-2">{dish.FoodName}</div>
                                <div className="col-span-1">x {dish.Quantity}</div>
                                <div className="col-span-3 ">{dish.Specification}</div>
                            </li>
                        )
                    })
                }
            </ul>
            
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(FoodOrders)