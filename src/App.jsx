import Login from './components/loginPage/login.component';
import WaiterPage from './containers/body/body.component';
import ChefPage from './containers/chefContent/chefBody.component';

import './App.css';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return{
    WaiterData: state.WaiterAppData.EmployeeData,
    WaiterSignedIn: state.WaiterAppData.SignedIn,
    ChefData: state.ChefAppData.ChefData,
    ChefSignedIn: state.ChefAppData.SignedIn

  }
}
const mapDispatchToProps = (dispatch) => {
    return {}
}
const App = (props) => {
  console.log(props)
  const { ChefData,WaiterData, WaiterSignedIn, ChefSignedIn} = props
      return (
        <div className="entire-page">
          { WaiterData.Position === 'WAITER' && WaiterSignedIn === true
          ? <WaiterPage />
          :ChefData.Position === 'CHEF' && ChefSignedIn === true
          ? <ChefPage />
          :<Login/>
          }
        </div>
      );

}


export default connect(mapStateToProps, mapDispatchToProps)(App);
