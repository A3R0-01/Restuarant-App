import { connect } from "react-redux"
import { useState } from 'react'
import { UpdateElement } from "../../../../Chef redux elements/actions"
import { RequestData } from "../../../../Waiter redux elements/actions"

const mapStateToProps = ({ ChefAppData }) => {
    return {
        UpdatePending: ChefAppData.UpdatePending,
        UpdateId: ChefAppData.UpdateId,
        UpdateError: ChefAppData.UpdateError,
        EmployeeData: ChefAppData.ChefData,
        ElementUpdate: ChefAppData.ElementUpdated,
        CategoryId: ChefAppData.ObjectToExpand
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        UpdateElement: (url, body) => dispatch(UpdateElement(url, body)),
        Refresh: (body) => dispatch(RequestData('http://localhost:8001/categories', body)),

    }
}
const FoodTile = (props) => {
    const {
        UpdateElement, CategoryId,
        ChefData, ElementUpdate, Refresh, EmployeeData,
        dish
    } = props
    const [edit, setEdit] = useState(false);
    const [foodName, setFoodName] = useState(dish.FoodName)
    const [foodPrice, setFoodPrice] = useState(dish.FoodPrice)
    const [foodDescription, setFoodDescription] = useState(dish.FoodDescription)
    const [foodStatus, setFoodStatus] = useState(dish.FoodStatus)
    const [menuState, setMenuState] = useState(dish.MenuState)
    const url = 'http://localhost:8001/categories'
    const foodStatusFunction = () => {
        if (foodStatus === 'IN-STOCK') {
            return 'OUT-OF-ORDER'
        } else {
            return 'IN-STOCK'
        }
    }
    const menuStateFunc = () => {
        if(dish.MenuState === 'IN-SERVICE'){
            return 'DELETED'
        }else if(dish.MenuState === 'DELETED') {
            return 'IN-SERVICE'
        }else{
            alert('ERROR')
        }
    }
    const refreshList = () => Refresh({
        type: 'menu/read',
        EmployeeData: EmployeeData,
        CategoryId: CategoryId
    })
    const deleteDish = () => {
        UpdateElement(url, {
            type: 'menu/delete',
            Id: dish.FoodId,
            MenuState: menuStateFunc()
        })
        refreshList()
    }
    const update = () => {
        UpdateElement(url, {
        type: 'menu/update',
        Id: dish.FoodId,
        FoodName: foodName,
        FoodPrice: foodPrice,
        FoodDescription: foodDescription,
        FoodStatus: foodStatus,
        MenuState: menuState,
        EmployeeData: ChefData,
    })
   refreshList()
}
    const Stockfunction = () => {

        UpdateElement(
            url,
            {
                type: 'menu/stock-change',
                FoodStatus: foodStatusFunction(),
                Id: dish.FoodId
            }
        )
        refreshList()
    }
    return (
        <div className="chef-menu-tile" key={dish.FoodId} id={`${dish.FoodId}`}>
            <div className="chef-menu-grid" >
                <h4>{dish.FoodId}</h4>
                <h4>{dish.FoodName}</h4>
                <h4>{dish.FoodDescription}</h4>
                <h4>$ {dish.FoodPrice}</h4>
                <h4 className="button" onClick={() => Stockfunction()}>{dish.FoodStatus}</h4>
                <h4 className="button" onClick={() => deleteDish()}>{dish.MenuState}</h4>
                <svg onClick={() => setEdit(!edit)} fill="#333" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" /><path d="M0-.25h24v24H0z" fill="none" /></svg>
            </div>
            {
                edit ?
                    <div className="chef-menu-edit-sec chef-menu-grid">
                        <div>{dish.FoodId}</div>
                        <div>Name: <br /> <input onChange={(event) => setFoodName(event.target.value)} type="text" className="" defaultValue={foodName} /></div>
                        <div>Descr: <br /> <input onChange={(event) => setFoodDescription(event.target.value)} type="textarea" className="" defaultValue={foodDescription} /></div>
                        <div>Price: <br /> <input onChange={(event) => setFoodPrice(event.target.value)} type="number" className="" defaultValue={foodPrice} /></div>
                        <div className="button" onClick={() => setFoodStatus(foodStatusFunction())}>{foodStatus}</div>
                        <div className="button" onClick={() => update()}>done</div>
                <svg onClick={() => setEdit(!edit)} fill="#333" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" /><path d="M0-.25h24v24H0z" fill="none" /></svg>
                    </div>
                    : <div></div>
            }

            <div className="chef"></div>
        </div>

    )
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodTile)