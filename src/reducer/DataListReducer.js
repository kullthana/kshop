import {
  FETCH_NOTEBOOKLIST,
  SEARCH_NOTEBOOKLIST,
  FETCH_DATA_LIST_SUCCESS,
  FETCH_DATA_LIST_ERROR,
  FILTER_NOTEBOOKLIST
} from '../actions/NotebookListsAction'

const initialState = {
  data: [],
  loading: false,
  filterType: 'All',
  searchData: '',
  err: ''
}

export const notebookListsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOTEBOOKLIST:
      return {
        ...state,
        loading: true
      }
    case FETCH_DATA_LIST_SUCCESS:
      return {
        ...state,
        data: action.payLoad,
        loading: false,
        err: ''
      }
    case FETCH_DATA_LIST_ERROR:
      return {
        ...state,
        loading: false,
        err: action.payLoad
      }
    case SEARCH_NOTEBOOKLIST:
      return {
        ...state,
        searchData: action.payLoad
      }
    case FILTER_NOTEBOOKLIST:
      return {
        ...state,
        filterType: action.payLoad
      }

    default:
      return state
  }
}
