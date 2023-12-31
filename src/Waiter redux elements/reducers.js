
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
  RequestClearanceDataPending,
  RequestClearanceDataSuccess,
  RequestClearanceDataFailed,
  SigningOut,
  CategoriesDataSuccess,
  CategoriesDataError,
  CategoriesDataPending,
  MenuError,
  MenuPending,
  MenuSuccess,
  SortColumn,
} from "./constaint";

// The initial state for the App Data on the Waiters Pages
const WaiterState = {
  TableSelected: "nothing",
  CustomerSelected: "nothing",
  EmployeeData: "nothing",
  PageName: "tables",
  Category: { CategoryId: 0, CategoryName: 'All' },
  SignedIn: false,
  OrderFoodPending: false,
  OrderFoodError: false,
  OrderFoodSuccess: false,
  SortColumn: 0
};
// The initial state for any data requests that are made eg. table list, menu list and order lists
const initialRequestedData = {
  isPending: false,
  dataRequested: [],
  error: "",
};
// The Initial state for the clearance data that will be shown on the screen for the customer whose selected by the waiter
const initialClearanceData = {
  isPending: false,
  dataRequested: [],
  error: "",
};
// The Reducer function for the Waiter's side of the Web App
export const WaiterAppData = (state = WaiterState, action = {}) => {
  switch (action.type) {
    case ChangeTableSelected:
      return Object.assign({}, state, {
        TableSelected: action.payload,
        PageName: "dashboard",
      });
    case ChangeCustomer:
      return Object.assign({}, state, { CustomerSelected: action.payload });
    case SetEmployee:
      return Object.assign({}, state, { EmployeeData: action.payload, SignedIn: true });
    case SetPageName:
      return Object.assign({}, state, { PageName: action.payload});
    case ChangeCategory:
      return Object.assign({}, state, {
        Category: action.payload,
        PageName: "food",
      });
    case SigningOut:
      return Object.assign({}, state, {
        TableSelected: "nothing",
        CustomerSelected: "nothing",
        EmployeeData: "nothing",
        PageName: "tables",
        Category: "nothing",
        SignedIn: false,
      });
    case SortColumn:
      return Object.assign({}, state, {SortColumn: action.payload})
    default:
      return state;
  }
};

// The Reducer that is responsible for handling common data requests that are made
export const RequestData = (state = initialRequestedData, action = {}) => {
  switch (action.type) {
    case RequestDataPending:
      return Object.assign({}, state, { isPending: true, dataRequested:[], error:"" });
    case RequestDataSuccess:
      return Object.assign({}, state, {
        dataRequested: action.payload,
        isPending: false,
        error: ""
      });
    case RequestDataFailed:
      return Object.assign({}, state, {
        error: action.payload,
        isPending: false,
        dataRequested:[]
      });
    case DefaultRequestedData:
      return Object.assign({}, state, {
        isPending: false,
        dataRequested: [],
        error: "",
      });
    default:
      return state;
  }
};

export const RequestClearanceData = (
  state = initialClearanceData,
  action = {}
) => {
  switch (action.type) {
    case RequestClearanceDataPending:
      return Object.assign({}, state, { isPending: true });
    case RequestClearanceDataSuccess:
      return Object.assign({}, state, {
        dataRequested: action.payload,
        isPending: false,
      });
    case RequestClearanceDataFailed:
      return Object.assign({}, state, {
        error: action.payload,
        isPending: false,
      });
    default:
      return state;
  }
};
const categoriesDataState = {
  isPending: false,
  Data: [],
  error: false
}
export const CategoriesData = (state=categoriesDataState, action={}) => {
  switch(action.type) {
    case CategoriesDataSuccess:
      return Object.assign({}, state, {isPending: false,
        Data: action.payload,
        error: false})
    case CategoriesDataError:
      return Object.assign({}, state, {isPending: false, error: true})
    case CategoriesDataPending:
      return Object.assign({}, state, {isPending: true,
        error: false})
    default:
      return state;
  }
}
const MenuState = {
  isPending: false,
  error: false,
  Data: []
}
export const MenuData = (state = MenuState, action={}) =>{
  switch(action.type){
    case MenuError:
      return Object.assign({}, state, {isPending: false, error: true})
    case MenuPending:
      return Object.assign({}, state, {isPending: true, error: false})
    case MenuSuccess:
      return Object.assign({}, state, {isPending: false, Data: action.payload, error: false})
    default:
      return state;
  }
}