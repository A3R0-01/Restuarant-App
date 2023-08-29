import { connect } from 'react-redux';
import { setEmployee } from '../../Waiter redux elements/actions';
import './login.styles.css';
import { Component } from "react";
import { ChefDataFunction } from '../../Chef redux elements/actions';

const mapStateToProps = (state) => {
    return{
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        SetEmployee: (employee) => dispatch(setEmployee(employee)),
        SetChefData: (chefData) => dispatch(ChefDataFunction(chefData))
    }
}

class Login extends Component{
    constructor(){
        super()
        this.state = {
            employeeId: 0,
            employeePosition: 'WAITER',
            employeePassword: 'null',
            message: false
        }
    }
    greenLight = () => {
        console.log(this.state)
        fetch('http://localhost:8000/login', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                EmployeeId: this.state.employeeId,
                Position: this.state.employeePosition,
                EmployeePassword: this.state.employeePassword
            })
        }
        ).then(response => response.json()).then((data) => {
            if (data === 'UNSUCCESSFUL'){
                this.setState({message: true})
            }else{
                if (data[0].Position === 'WAITER') {
                this.props.SetEmployee(data[0])
                }else if(data[0].Position === 'CHEF'){
                    this.props.SetChefData(data[0])
                }
                // this.props.pageFunction({
                //     id: data[0].EmployeeId,
                //     position: data[0].Position,
                //     password: data[0].EmployeePassword
                // })
                console.log(data)
            }
         })
    }
    onChangeSet = (event) => {
        this.setState({employeeId: event.target.value})
    }
    render(){
        return (
        
            <div className="login-box">
                <center>
                    {this.state.message
                    ? <h3 style={{"color": "red"}}>Wrong Details, try again</h3>
                    : <h3 style={{"color": "green"}}>Please enter info</h3>
                    }
                </center>
    
                <div className="user-box">
                <input onChange={this.onChangeSet} className="input-item" type="number" name="employeeId" required/>
                <label>Employee ID </label>
                </div>
                <div className="user-box">
                <select onChange={(event) => {
                    this.setState({employeePosition: event.target.value})
                }}className="input-item" name="position" id="">
                    <option value="WAITER">Waiter</option>
                    <option value="CHEF">Chef</option>
                    <option value="MANAGER">Manager</option>
                </select>
                <label>Position</label>
                </div>
                <div className="user-box">
                <input onChange={(event) => {
                    this.setState({employeePassword: event.target.value})
                }} className="input-item" type="password" name="" required=""/>
                <label>Password</label>
                </div><center>
                <button onClick={this.greenLight} href="#">
                    Sign In
                <span></span>
                </button></center>
            
            </div>
        );
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);