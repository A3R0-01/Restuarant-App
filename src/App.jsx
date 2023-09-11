import Login from './components/loginPage/login.component';
import WaiterPage from './containers/body/body.component';
import ChefPage from './containers/chefContent/chefBody.component';

import './App.css';
import { connect } from 'react-redux';
import HomePageComponent from './containers/managerContent/ManagerHomePage/homePage.component';
import ManagerNavBarComponent from './containers/managerContent/ManagerNavBar/ManagerNavBar.component';
import ManagerAppComponent from './containers/managerContent/ManagerApp.component';

const mapStateToProps = (state) => {
  return{
    WaiterData: state.WaiterAppData.EmployeeData,
    WaiterSignedIn: state.WaiterAppData.SignedIn,
    ChefData: state.ChefAppData.ChefData,
    ChefSignedIn: state.ChefAppData.SignedIn,
    ManagerData: state.ManagerAppData.EmployeeData,
    ManagerSignedIn: state.ManagerAppData.SignedIn

  }
}
const mapDispatchToProps = (dispatch) => {
    return {}
}
const App = (props) => {
  console.log(props)
  const { ChefData,WaiterData, WaiterSignedIn, ChefSignedIn, ManagerData, ManagerSignedIn} = props
      return (
        <div className="entire-page bg-zinc-900 min-h-screen pb-12">
          { WaiterData.Position === 'WAITER' && WaiterSignedIn === true
          ? <WaiterPage />
          :ChefData.Position === 'CHEF' && ChefSignedIn === true
          ? <ChefPage />
          :ManagerData.Position === 'MANAGER' && ManagerSignedIn
          ?<div>
            <ManagerNavBarComponent/>
            <ManagerAppComponent/>
          </div>
          :<Login/>
          }
        </div>
      );

}


export default connect(mapStateToProps, mapDispatchToProps)(App);
