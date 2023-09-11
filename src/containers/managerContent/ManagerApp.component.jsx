import { connect } from "react-redux"
import HomePageComponent from "./ManagerHomePage/homePage.component"
import ViewPortPageComponent from "./ViewPortPage/ViewPortPage.component"


const mapStateToProps = ({ManagerAppData}) => {

    return{
        PageName: ManagerAppData.PageName,
    }
}

const mapDispatchToProps = (dispatch) => {
    return{

    }
}

const ManagerAppPage = (props) => {
    const {PageName} = props
    return(
            PageName === 'home'? <HomePageComponent/>
            :PageName === 'viewport'?<ViewPortPageComponent/>
            :<div></div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagerAppPage)