import { RequestData } from '../Waiter redux elements/actions';
import {
    CategoryListError,
    CategoryListPending,
    CategoryListSuccess,
    ChefSignOut,
    CreateElementDefault,
    CreateElementError,
    CreateElementPending,
    CreateElementSuccess,
    ElementUpdate,
    ElementUpdateDefault,
    ObjectToExpand,
    ObjectToExpandDefault,
    SelectObjectToEdit,
    SetChefData,
    SetChefPageName,
    TableClassesDefault,
    TableClassesError,
    TableClassesPending,
    TableClassesSuccess,
    UpdateDefault,
    UpdateError,
    UpdatePending,
    UpdateSuccess,
} from './constants';

export const ChefPageNameFunction = (pageName) => (dispatch) => {
    dispatch(({
        type: SetChefPageName,
        payload: pageName
    }))
    dispatch({type: UpdateDefault})
    dispatch(DefaultObjectEdited())
    dispatch({type: TableClassesDefault})
    dispatch(AddingElementDefault())
    dispatch(SetDefaultObjectToExpand())
}
// this is the function that sets the chef's credentials on the app
export const ChefDataFunction = (chefData) => ({
    type: SetChefData,
    payload: chefData
})
export const ChefLogOut = () => ({type: ChefSignOut})

export const SetObjectToExpand =(ObjectId, url, body) => dispatch => {
    dispatch({type: ObjectToExpand, payload: ObjectId})
    dispatch(RequestData(url, body))
}
export const SetDefaultObjectToExpand = () => ({type: ObjectToExpandDefault})

export const SetObjectedEdited = (objectId, body=false) => dispatch => {
    dispatch({type: SelectObjectToEdit, payload: objectId})
    if(body){
        if (body.type === 'classes/read') {
            dispatch(GetTableClasses(body))
        }
    }
}
export const DefaultObjectEdited = () => ({type: SelectObjectToEdit, payload: 0})


export const SetElementUpdate = (text) => ({type: ElementUpdate, payload: text})
export const DefaultElementUpdate = () => ({type: ElementUpdateDefault, payload:""})


export const AddingElementToRecords = (url, body) => dispatch => {
    dispatch({type: CreateElementPending})
    fetch(url, {
        method: 'post',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    }).then(response => response.json()).then(data=> dispatch({type: CreateElementSuccess, payload: data})).catch({type: CreateElementError})
}
export const AddingElementDefault = () => ({type: CreateElementDefault})
export const UpdateElement = (url, body) => (dispatch) => {
    dispatch({type: UpdatePending, payload: body.Id})
    fetch(url, {
        method: 'post',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    }).then(response => response.json()).then(data=> {
        if(data === 'SUCCESSFUL'){
            dispatch({type: UpdateSuccess, payload: body.Id})
        }else{
            dispatch({type: UpdateError, payload: body.Id})
        }
    }).catch({type: UpdateError, payload: body.Id})
}


export const GetTableClasses = (body) => (dispatch) => {
    dispatch({type: TableClassesPending, payload: true})
    fetch('http://localhost:8001/classes'
        , {
        method: 'post',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    }).then(response => response.json()).then(data=> dispatch({type: TableClassesSuccess, payload: data})).catch(dispatch({type: TableClassesError}))
}

export const GetChefCategories = (body) => (dispatch) => {
    dispatch({type: CategoryListPending})
    fetch('http://localhost:8001/categories'
        , {
        method: 'post',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    }).then(response => response.json()).then(data=> dispatch({type: CategoryListSuccess, payload: data})).catch(dispatch({type: CategoryListError}))
}
