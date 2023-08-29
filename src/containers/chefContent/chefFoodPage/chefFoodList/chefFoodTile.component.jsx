import { connect } from "react-redux"
import { useState } from 'react'
import { UpdateElement } from "../../../../Chef redux elements/actions"
import { RequestData } from "../../../../Waiter redux elements/actions"

const mapStateToProps = ({ChefAppData}) => {
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
    return{
        UpdateElement: (url, body) => dispatch(UpdateElement(url, body)),
        Refresh: (body) => dispatch(RequestData('http://localhost:8001/categories', body)),

    }
}
const FoodTile =(props) => {
    const {
        UpdateElement,CategoryId,
        ChefData,ElementUpdate,Refresh,EmployeeData,
        dish
    } = props
    const [Feature, setFeature] = useState('n/a');
    const [foodName, setFoodName] = useState(dish.FoodName)
    const [foodPrice, setFoodPrice] = useState(dish.FoodPrice)
    const [foodDescription, setFoodDescription] = useState(dish.FoodDescription)
    const [foodStatus, setFoodStatus] = useState(dish.FoodStatus)
    const [menuState, setMenuState] = useState(dish.MenuState)
    const url = 'http://localhost:8001/categories'
    const foodStatusFunction = () => {
        if(foodStatus === 'IN-STOCK'){
            return 'OUT-OF-ORDER'
        }else{
            return 'IN-STOCK'
        }
    }
    const update = () => UpdateElement(url,{
        type: 'menu/update',
        FoodId: dish.FoodId,
        FoodName: foodName,
        FoodPrice: foodPrice,
        FoodDescription: foodDescription,
        FoodStatus: foodStatus,
        MenuState: menuState,
        EmployeeData: ChefData,
    })
    const Stockfunction = () => {
        
        UpdateElement(
        url,
        {
            type: 'menu/stock-change',
            FoodStatus: foodStatusFunction(),
            Id: dish.FoodId
        }
    )
    Refresh({
        type: 'menu/read',
        EmployeeData: EmployeeData,
        CategoryId: CategoryId
    })
}
    return(
        <div className="chef-menu-tile" key={dish.FoodId} id={`${dish.FoodId}`}>
            <div className="chef-menu-grid" >
            <h4>{dish.FoodId}</h4>
            <h4>{dish.FoodName}</h4>
            <h4>{dish.FoodDescription}</h4>
            <h4>$ {dish.FoodPrice}</h4>
            <h4 onClick={() => Stockfunction()}>{dish.FoodStatus}</h4>
            <h4>{dish.MenuState}</h4>
        </div>
        <div className="chef"></div>
        </div>
        
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodTile)