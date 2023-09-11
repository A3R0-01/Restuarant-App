import { connect } from "react-redux"
import { SetViewPoint } from "../../../ManagerReduxElements/actions"

const mapStateToProps = ({ManagerAppData}) => {
    return{
        ManagerData: ManagerAppData.EmployeeData,
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        SetViewPoint: (page) => dispatch(SetViewPoint(page))
    }
}

const ManagerHomePage = (props) => {
    const {SetViewPoint} = props
    return(
        <div className="manager-home flex flex-row my-12 flex-wrap w-11/12 p-7 justify-around">
            <div className="home-page-item" onClick={() => SetViewPoint('waiter')}>Waiters</div>
            <div className="home-page-item" onClick={() => SetViewPoint('manager')}>Manager</div>
            <div className="home-page-item" onClick={() => SetViewPoint('chef')}>Chef</div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagerHomePage)