import { connect } from 'react-redux';
import './navigation.styles.css';
import { loggingOut, setPageName } from '../../../Waiter redux elements/actions';

const mapDispatchToProps = (dispatch) => {
    return {
        SetPageName: (data) => dispatch(setPageName(data)),
        SignOut: () => dispatch(loggingOut())
    }
}
const mapStateToProps = (data) =>{
    return {

    }
}
const Navigation = (props) => {
   const {SetPageName, SignOut} = props
   const navControl = (page) => {
        SetPageName(page)
        document.querySelector(".navbar").classList.toggle("collapsed")

   }
    return(
        <div className="navbar">

        <div className="logo">
            <h2>BRAND</h2>
        </div>


        <ul className="links">
            <li onClick={() => navControl('tables')} ><a>Home</a></li>
            <li onClick={() => navControl('orders')} ><a>Orders</a></li>
            <li onClick={() => navControl('categories')} ><a>Categories</a></li>
            <li onClick={() => navControl('tables')} ><a>Tables</a></li>
            <li onClick={() => navControl('tables')} ><a>Cost</a></li>
            <button className="nav-btn" onClick={() => SignOut('login')}>Sign Out</button>
        </ul>


        <div className="right">
            <button className="nav-btn" onClick={() => {
                SetPageName('dashboard')}} >Dashboard</button>
        </div>

        <div className="toggle" onClick={() => document.querySelector(".navbar").classList.toggle("collapsed")}>
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
        </div>
    </div>
    
    );
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);