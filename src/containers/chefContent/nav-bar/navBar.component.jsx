import { connect } from 'react-redux'
import { ChefLogOut, ChefPageNameFunction } from '../../../Chef redux elements/actions'
import './navBar.styles.css'

const mapStateToProps = (state) => {
    return{}
}
const maDispatchToProps = (dispatch) => {
    return {
        SetPageName: (pageName) => dispatch(ChefPageNameFunction(pageName)),
        SignOut: () => dispatch(ChefLogOut())
    }
}
const NavBar = (props) => {
    window.addEventListener("scroll", (e) => {
        let windowY = window.pageYOffset;

        let navbarHeight = document.querySelector(".navbar").offsetHeight;

        if (windowY > navbarHeight) document.querySelector(".navbar").classList.add("sticky");
        else document.querySelector(".navbar").classList.remove("sticky");
    });
    const {SetPageName, SignOut} = props
    return (
        <div className="navbar">

            <div className="logo">
                <h2>BRAND</h2>
            </div>


            <ul className="links">
                <li onClick={() => SetPageName('home')} ><a href='#design'>Home</a></li>
                <li onClick={() => SetPageName('orders')} ><a href='#design'>Orders</a></li>
                <li onClick={() => SetPageName('food')} ><a  href='#design'>Food</a></li>
                <li onClick={() => SetPageName('tables')} ><a  href='#design'>Tables</a></li>
                <li onClick={() => SetPageName('classes')} ><a  href='#design'>Classes</a></li>
            </ul>


            <div className="right">
                <button onClick={() => SignOut('home')} className='nav-btn'>Log Out</button>
            </div>

            <div className="toggle" onClick={() => document.querySelector(".navbar").classList.toggle("collapsed")}>
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </div>
        </div>
    )
}
export default connect(mapStateToProps, maDispatchToProps)( NavBar);