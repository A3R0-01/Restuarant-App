import { AddStaffError, AddStaffPending, AddStaffSuccess, DataError, DataPending, DataSuccess, PageName, SignIn, SignOut, UpdateDefault, UpdateError, UpdatePending, UpdateSuccess, ViewPoint } from "./constants";


export const SignManagerIn = (EmployeeData) => ({type: SignIn, payload: EmployeeData})

export const SignOutManager = () => ({type: SignOut})

export const SetPageName = (page) => dispatch => {
    dispatch(SetUpdateDefault())
    dispatch(({type: PageName, payload: page}))
}
export const SetViewPoint = (cat) => dispatch => {
    dispatch({type: ViewPoint, payload:cat})
    dispatch(SetPageName('viewport'))
}

export const FetchEmployees = (body) => dispatch => {
    dispatch({type: DataPending})
    fetch('http://localhost:8001/employees', {
        method: 'post',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    }).then(response => response.json()).then(data => {
        if (data === 'UNSUCCESSFUL'){
            dispatch({type: DataError})
        }else{
            dispatch({type: DataSuccess, payload: data})
        }
    }).catch(dispatch({type: DataError}))
}
export const SetUpdateDefault = () => ({type: UpdateDefault})
export const UpdateEmployeesRecords = (body) => dispatch => {
    dispatch({type: UpdatePending, payload:body.EmployeeId})
    fetch('http://localhost:8001/employees', 
        {
            method: 'post',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        }
    ).then(response => response.json()).then(data => {
        if(data === 'SUCCESSFUL'){
            dispatch({type: UpdateSuccess, payload: body.EmployeeId})
        }else{
            dispatch({type: UpdateError, payload: body.EmployeeId})
        }
    }).catch(dispatch({type: UpdateError, payload: body.EmployeeId}))
}
export const HireStaff = (body) => dispatch => {
    dispatch({type:AddStaffPending})
    fetch('http://localhost:8001/employees', 
        {
            method: 'post',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        }
    ).then(response => response.json()).then(data => {
        if(data === 'SUCCESSFUL'){
            dispatch({type: AddStaffSuccess})
        }else{
            dispatch({type: AddStaffError})
        }
    }).catch(dispatch({type: AddStaffError}))
}
