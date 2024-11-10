import { notebookListsReducer } from './DataListReducer'
import { combineReducers } from 'redux'
import { notebookReducer } from './NotebookReducer'
import { DetailReducer } from './DetailReducer'
import { NavReducer } from './NavReducer'
import { dataHomeReducer } from './ReducerHome'
import { dataCartReducer } from './CartReducer'

export const rootReducer = combineReducers({
  listNotebook: notebookListsReducer,
  data: notebookReducer,
  detailState: DetailReducer,
  toggle: NavReducer,
  dataHomePage: dataHomeReducer,
  cartPage: dataCartReducer
})
