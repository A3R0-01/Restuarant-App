import { useEffect } from "react";
import FoodCard from "./food-card/food-card.component";
import './food-list.styles.css'
import { connect } from "react-redux";
import { FetchMenu } from "../../../Waiter redux elements/actions";

const mapStateToProps = ({WaiterAppData, MenuData}) => {
    return {
        Menu: MenuData.Data,
        isPending: MenuData.isPending,
        error: MenuData.error,
        TableData: WaiterAppData.TableSelected,
        EmployeeData: WaiterAppData.EmployeeData,
        SortColumn: WaiterAppData.SortColumn,
        Category: WaiterAppData.Category
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        RequestMenu: (body) => dispatch(FetchMenu(body))
    }
}

const FoodList = (props) => {
    const {Menu, isPending, TableData, Customer,RequestMenu, Category, EmployeeData, SortColumn
    
    } = props
    useEffect(() => {

        RequestMenu({
            category: Category.CategoryId,
            sortColumn: SortColumn,
            EmployeeData: EmployeeData
        })
    }, [SortColumn, Category])
    let count = 0
    return isPending?
            <h1>Loading</h1>:
    (
        <div className="foodBody">
            <center>
                <h1 className="food-title">{Category.CategoryName}</h1>
            </center>
            <div className="food-list">
                {Menu.map((food) => {
                    count = count+1
                    return <FoodCard menuItem={food} Customer={Customer} Table={TableData} EmployeeData={EmployeeData} count={count} />
                })}
            </div>
        </div>
    )


}

export default connect(mapStateToProps, mapDispatchToProps)(FoodList);