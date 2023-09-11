import { connect } from "react-redux"
import { SetDefaultObjectToExpand, SetElementUpdate } from "../../../../Chef redux elements/actions"
import ChefFoodTileComponent from "./chefFoodTile.component"

import { RequestData } from "../../../../Waiter redux elements/actions"
import { useEffect } from "react"
import { useState } from "react"
import AddDish from "./AddDish.component"

const mapStateToProps = ({ RequestData, ChefAppData }) => {
    return {
        MenuList: RequestData.dataRequested,
        EmployeeData: ChefAppData.ChefData,
        CategoryId: ChefAppData.ObjectToExpand,
        MenuPending: RequestData.isPending,
        MenuError: RequestData.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        SetObjectToExpandDefault: () => dispatch(SetDefaultObjectToExpand()),
        Refresh: (body) => dispatch(RequestData('http://localhost:8001/categories', body)),
        SetElementUpdate: () => dispatch(SetElementUpdate('menu'))
    }
}
const ChefFoodList = (props) => {
    const {
        MenuList, MenuPending, MenuError,
        SetObjectToExpandDefault,
        CategoryId,
        Refresh, EmployeeData,
    } = props
    const [addDish, setAdd] = useState(false)
    const RefreshPage = () => Refresh({
        type:'menu/read',
        CategoryId: CategoryId,
        EmployeeData: EmployeeData
    })

    return (
        <div className="chef-menu-container">
            <div className="chef-category-button-grp">
                <h3 className="button" onClick={() => SetObjectToExpandDefault()}>Minimize</h3>
                <h3 className="button"onClick={() => RefreshPage()}>Refresh</h3>

            </div>
            <div className="chef-menu-headings chef-menu-grid">
                <h2>Id</h2>
                <h2>Name</h2>
                <h2>Description</h2>
                <h2>Price</h2>
                <h2>Status</h2>
                <h2>MenuState</h2>
                <svg fill="#333" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" /><path d="M0-.25h24v24H0z" fill="none" /></svg>
            </div>
            {
                MenuPending ? <h3>Pending</h3>
                    : MenuError ? <h3>{MenuError}</h3>
                        :
                        <div className="chef-menu-list">
                            {MenuList.map((dish) => {
                                return <ChefFoodTileComponent dish={dish} />
                            })}
                        </div>
            }
            {
                addDish? <AddDish setAdd={setAdd} refresh={RefreshPage}/>
                :<div className="button" onClick={() => setAdd(!addDish)}>New Dish</div>
            }

        </div>

    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ChefFoodList)