import { connect } from 'react-redux'

import './navBar.styles.css'
import { SetPageName, SetViewPoint, SignOutManager } from '../../../ManagerReduxElements/actions'

const mapStateToProps = (state) => {
    return{}
}
const maDispatchToProps = (dispatch) => {
    return {
        SetPageName: (pageName) => dispatch(SetPageName(pageName)),
        SignOut: () => dispatch(SignOutManager()),
        SetViewPoint: (page) => dispatch(SetViewPoint(page)),
    }
}
const ManagerNavBar = (props) => {
    window.addEventListener("scroll", (e) => {
        let windowY = window.pageYOffset;

        let navbarHeight = document.querySelector(".navbar").offsetHeight;

        if (windowY > navbarHeight) document.querySelector(".navbar").classList.add("sticky");
        else document.querySelector(".navbar").classList.remove("sticky");
    });
    const {SetPageName, SignOut, SetViewPoint} = props
    const toggleFunc = () => document.querySelector(".navbar").classList.toggle("collapsed")
    return (
        <div className="navbar">

            <div className="logo">
                <h2>BRAND</h2>
            </div>


            <ul className="links">
                <li onClick={() => {SetPageName('home')
            toggleFunc()
            }} ><a href='#design'>Home</a></li>
                <li onClick={() => {SetViewPoint('waiter')
            toggleFunc()
            }} ><a href='#design'>Waiters</a></li>
                <li onClick={() => {SetViewPoint('chef')
            toggleFunc()
            }} ><a href='#design'>Chefs</a></li>
                <li onClick={() => {SetViewPoint('manager')
            toggleFunc()
            }} ><a href='#design'>manager</a></li>
            </ul>


            <div className="right">
                <button onClick={() => SignOut('home')} className='nav-btn'>Log Out</button>
            </div>

            <div className="toggle" onClick={() => toggleFunc()}>
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </div>
        </div>
    )
}
export default connect(mapStateToProps, maDispatchToProps)( ManagerNavBar);