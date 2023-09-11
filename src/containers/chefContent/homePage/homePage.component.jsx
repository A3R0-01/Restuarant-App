import { connect } from 'react-redux'
import { ChefPageNameFunction } from '../../../Chef redux elements/actions'
import './chefHomePage.styles.css'

const mapStateToProps = (state) => {
    return{
        EmployeeData: state.ChefAppData.ChefData
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        SetPageName: (pageName) => dispatch(ChefPageNameFunction(pageName))
    }
}
const ChefHomePage = (props) => {
    const {SetPageName }= props
    return (
        <div className="chefHomePage-container text-slate-300">
            <div onClick={() => SetPageName('tables')} className="items">Tables</div>
            <div onClick={() => SetPageName('orders')} className="items">Orders</div>
            <div onClick={() => SetPageName('food')} className="items">Food</div>
            <div onClick={() => SetPageName('classes')} className="items">Table Classes</div>
        </div>
    )

}
export default connect(mapStateToProps, mapDispatchToProps)(ChefHomePage);