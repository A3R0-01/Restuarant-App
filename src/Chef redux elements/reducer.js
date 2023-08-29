import {
  SelectObjectToEdit,
  SetChefData,
  SetChefPageName,
  TableClassesError,
  TableClassesPending,
  TableClassesSuccess,
  UpdateDefault,
  UpdateError,
  UpdatePending,
  UpdateSuccess,
  CreateElementPending,
  ChefSignOut,
  CreateElementError,
  CreateElementSuccess,
  CreateElementDefault,
  TableClassesDefault,
  CategoryListError,
  CategoryListPending,
  CategoryListSuccess,
  ObjectToExpand,
  ObjectToExpandDefault,
  ElementUpdate,
  ElementUpdateDefault
} from "./constants";

// The initial state for the Chef's App, this state will be used to view and navigate the application for the chef
const ChefState = {
  PageName: "home",
  ChefData: "nothing",
  Category: "nothing",
  SignedIn: false,

  ClassesPending: false,
  ClassesError: false,
  TableClasses: [],

  ObjectEditedId: 0,

  UpdatePending: 0,
  UpdateId: 0,
  UpdateError: 0,

  CreateElementPending: false,
  CreateElementResponse: '',
  CreateElementError: false,

  CategoryList: [],
  CategoryListError: false,
  CategoryListPending: false,

  ObjectToExpand: 0,
  ElementUpdated: ""
};

export const ChefAppData = (state = ChefState, action = {}) => {
  switch (action.type) {
    case SetChefPageName:
      return Object.assign({}, state, { PageName: action.payload });
    case SetChefData:
      return Object.assign({}, state, {
        ChefData: action.payload,
        SignedIn: true,
      });
    case ChefSignOut:
      return Object.assign({}, state, {
        PageName: "home",
        ChefData: "nothing",
        Category: "nothing",
        SignedIn: false,
      });
    case TableClassesError:
      return Object.assign({}, state, {
        ClassesError: true,
        ClassesPending: false,
      });
    case TableClassesPending:
      return Object.assign({}, state, { ClassesPending: true });
    case TableClassesSuccess:
      return Object.assign({}, state, {
        TableClasses: action.payload,
        ClassesPending: false,
        ClassesError: false
      });
    case TableClassesDefault:
      return Object.assign({}, state, {ClassesPending: false,
        ClassesError: false,
        TableClasses: [],})
    case SelectObjectToEdit:
      return Object.assign({}, state, { ObjectEditedId: action.payload });
    case ObjectToExpand:
      return Object.assign({}, state, {ObjectToExpand: action.payload})
    case ObjectToExpandDefault:
      return Object.assign({}, state, {ObjectToExpand: 0})
    case UpdatePending:
        return Object.assign({}, state, { UpdatePending: action.payload, UpdateError: 0, UpdateId: 0 });
    case UpdateSuccess:
        return Object.assign({}, state, { UpdateId: action.payload, UpdatePending: 0, UpdateError: 0});
    case UpdateError:
        return  Object.assign({}, state, { UpdateError: action.payload, UpdatePending: 0, UpdateId: 0 });
    case UpdateDefault:
        return Object.assign({}, state, { UpdateId: 0, UpdateError: 0, UpdatePending: 0 });
    case CreateElementPending:
      return Object.assign({}, state, {CreateElementPending: true})
    case CreateElementError:
      return Object.assign({}, state, {CreateElementPending: false, CreateElementError: 'FAILED TO SEND REQUEST'})
    case CreateElementSuccess:
      return Object.assign({}, state, {CreateElementResponse: action.payload, CreateElementPending: false, CreateElementError: false})
    case CreateElementDefault:
      return Object.assign({}, state, { CreateElementPending: false,
        CreateElementResponse: '',
        CreateElementError: false,})
    case CategoryListError:
      return Object.assign({}, state, {CategoryListError: true, CategoryListPending:false, CategoryList: [] })
    case CategoryListPending:
      return Object.assign({}, state, {CategoryListPending: true, CategoryListError:false, CategoryList:[]})
    case CategoryListSuccess:
      return Object.assign({}, state, {CategoryList: action.payload, CategoryListError: false, CategoryListPending: false})
    case ElementUpdate:
      return Object.assign({}, state, {ElementUpdated: action.payload})
    case ElementUpdateDefault:
      return Object.assign({}, state, {ElementUpdated: action.payload})
    default:
      return state;
  }
};
