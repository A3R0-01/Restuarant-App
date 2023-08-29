import NavBar from "./nav-bar/navBar.component"
import ChefHomePage from "./homePage/homePage.component"
import ChefCategoryList from "./chefFoodPage/chefFoodPage/chefCategoryList.component"
import { connect } from "react-redux"
import TableList from "./tables/tableList.component"

const mapStateToProps = (state) => {
    return{
        PageName: state.ChefAppData.PageName
    }
}
const maDispatchToProps = (dispatch) => {
    return{}
}
const ChefPage = (props) => {
    const {PageName }= props
    return (
        <div className="chef-page">
            <NavBar />
            {PageName === 'food'
                ?<ChefCategoryList/>
                :PageName === 'tables'? <TableList/>
                :<ChefHomePage />
            }
        </div>

    )

}
export default connect(mapStateToProps, maDispatchToProps)(ChefPage)