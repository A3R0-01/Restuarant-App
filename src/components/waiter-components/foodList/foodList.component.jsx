import { useState, useEffect } from "react";
import FoodCard from "./food-card/food-card.component";
import './food-list.styles.css'
import { connect } from "react-redux";
import { RequestData } from "../../../Waiter redux elements/actions";

const mapStateToProps = (state) => {
    return {
        Menu: state.RequestData.dataRequested,
        isPending: state.RequestData.isPending,
        error: state.RequestData.error,
        TableData: state.WaiterAppData.TableSelected
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        RequestMenu: (url, body) => dispatch(RequestData(url, body))
    }
}

const FoodList = (props) => {
    const [sortColumn, setSortColumn] = useState('FoodName')
    const {Menu, isPending, TableData, Customer,RequestMenu, Category, EmployeeData } = props
    useEffect(() => {

        RequestMenu('http://localhost:8000/menu', {
            category: Category.CategoryId,
            sortColumn: sortColumn
        })
    }, [sortColumn])
    let count = 0
    return isPending?
            <h1>Loading</h1>:
    (
        <div className="foodBody">
            <center>
                <h1 className="food-title">{Category.CategoryName}</h1>
                <div className="sort-elements">
                    <label htmlFor="sort-by">Sort By </label>
                    <select id="sort-by" onChange={(event) => setSortColumn(event.target.value)}>
                        <option value="FoodName" key="name">Name</option>
                        <option value="FoodPrice" key="price">Price</option>
                    </select>
                </div>
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