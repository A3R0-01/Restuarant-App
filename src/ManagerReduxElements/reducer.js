import { AddStaffDefault, AddStaffError, AddStaffPending, AddStaffSuccess, DataError, DataPending, DataSuccess, ObjectToExpand, PageName, SignIn, SignOut, UpdateDefault, UpdateError, UpdatePending, UpdateSuccess, ViewPoint } from "./constants"

const State ={
  SignedIn: false,
  EmployeeData: "nothing",
  PageName: null,
  ViewPortCat: null,
  DataList: [],
  DataPending: false,
  DataError: false,
  ObjectToExpand: 0,
  UpdatePending: 0,
  UpdateError: 0, 
  UpdateSuccess: 0,
  AddStaffSuccess: false,
  AddStaffPending: false,
  AddStaffError: false,
}

export const ManagerAppData = (state=State, action={}) => {
    switch(action.type){
        case SignIn:
            return Object.assign({}, state, {EmployeeData: action.payload, PageName: 'home', SignedIn: true} )
        case SignOut:
            return Object.assign({}, state, {EmployeeData: {}, SignedIn: false})
        case PageName: 
            return Object.assign({}, state, {PageName: action.payload})
        case ViewPoint: 
            return Object.assign({}, state, {ViewPortCat: action.payload})
        case ObjectToExpand:
            return Object.assign({}, state, {ObjectToExpand: action.payload})
        case DataError:
            return Object.assign({}, state, {DataError: true, DataPending: false})
        case DataPending:
            return Object.assign({}, state, {DataError: false, DataPending: true})
        case DataSuccess:
            return Object.assign({}, state, {DataList: action.payload, DataError: false, DataPending: false})
        case UpdateDefault:
            return Object.assign({}, state , {UpdateError: 0, UpdatePending: 0, UpdateSuccess: 0})
        case UpdatePending:
            return Object.assign({}, state , {UpdateError: 0, UpdatePending: action.payload, UpdateSuccess: 0})
        case UpdateSuccess:
            return Object.assign({}, state , {UpdateError: 0, UpdateSuccess: action.payload, UpdatePending: 0})
        case UpdateError: 
            return Object.assign({}, state, {UpdateError: action.payload, UpdatePending: 0, UpdateSuccess: 0})
        case AddStaffDefault:
            return Object.assign({}, state, {AddStaffError: false, AddStaffPending: false, AddStaffSuccess: false})
        case AddStaffSuccess:
            return Object.assign({}, state, {AddStaffError: false, AddStaffPending: false, AddStaffSuccess: true})
        case AddStaffPending:
            return Object.assign({}, state, {AddStaffError: false, AddStaffPending: true, AddStaffSuccess: false})
        case AddStaffError:
            return Object.assign({}, state, {AddStaffError: true, AddStaffPending: false, AddStaffSuccess: false})
        default:
            return state
    }
}