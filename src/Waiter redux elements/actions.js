import {
  ChangeTableSelected,
  ChangeCustomer,
  SetEmployee,
  SetPageName,
  RequestDataPending,
  RequestDataSuccess,
  RequestDataFailed,
  ChangeCategory,
  DefaultRequestedData,
  RequestClearanceDataFailed,
  RequestClearanceDataSuccess,
  RequestClearanceDataPending,
  SigningIn,
  SigningOut,
  CategoriesDataPending,
  CategoriesDataError,
  CategoriesDataSuccess,
  MenuError,
  MenuSuccess,
  MenuPending,
  SortColumn,
} from "./constaint";
export const setTableData = (tableData) => ({
  type: ChangeTableSelected,
  payload: tableData,
});
// export const DealCustomer = (customerData) => ({
//     type: ChangeCustomer,
//     payload: customerData
// })
export const SetCustomer = (customerData) => (dispatch) => {
  dispatch({
    type: ChangeCustomer,
    payload: customerData,
  });
  dispatch(setClearanceData({ CustomerId: customerData.CustomerId }));
};

export const setEmployee = (employeeData) => (dispatch) => {
  dispatch({
    type: SetEmployee,
    payload: employeeData,
  });
};
export const setPageName = (text) => dispatch => {
  dispatch({type: SetPageName, payload: text})
  dispatch({type: SortColumn, payload: 0})
};
export const setCategory = (IdAndName) => ({
  type: ChangeCategory,
  payload: IdAndName,
});
export const loggingOut = () => ({
  type: SigningOut,
});
export const setRequestToDefault = () => ({
  type: DefaultRequestedData,
});
export const SetSortColumn = (data) => ({type: SortColumn, payload:data})
export const RequestData = (url, body) => (dispatch) => {
  dispatch({ type: RequestDataPending });
  fetch(url, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((tableData) =>
      dispatch({
        type: RequestDataSuccess,
        payload: tableData,
      })
    )
    .catch({ type: RequestDataFailed, payload: "UNSUCCESSFUL" });
};

export const setClearanceData = (body) => (dispatch) => {
  dispatch({ type: RequestClearanceDataPending });
  fetch("http://localhost:8000/RequestClearance", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((tableData) =>
      dispatch({
        type: RequestClearanceDataSuccess,
        payload: tableData,
      })
    );
};
export const FetchCategories = (body) => (dispatch) => {
  dispatch({ type: CategoriesDataPending });
  fetch("http://localhost:8000/categories", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data === 'UNSUCCESSFUL') {
        dispatch({type: CategoriesDataError})
      }else{
        dispatch({
          type: CategoriesDataSuccess,
          payload: data,
        })
      }
    }
    ).catch(dispatch({type: CategoriesDataError}));
};

export const FetchMenu = (body) => (dispatch) => {
  dispatch({ type: MenuPending });
  fetch("http://localhost:8000/menu", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data === 'UNSUCCESSFUL') {
        dispatch({type: MenuError})
      }else{
        dispatch({
          type: MenuSuccess,
          payload: data,
        })
      }
    }
    ).catch(dispatch({type: MenuError}));
};
