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
export const setPageName = (text) => ({
  type: SetPageName,
  payload: text,
});
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
