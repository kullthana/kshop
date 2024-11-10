import {
  FETCH_NOTEBOOK_DETAIL_BEGIN,
  FETCH_NOTEBOOK_DETAIL_SUCCESS,
  FETCH_NOTEBOOK_DETAIL_ERROR
} from '../actions/DetailAction'

const initialState = {
  notebookDetail: null,
  loading: false,
  error: ''
}

export const DetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOTEBOOK_DETAIL_BEGIN:
      return {
        ...state,
        loadingDetail: true
      }
    case FETCH_NOTEBOOK_DETAIL_SUCCESS:
      return {
        ...state,
        notebookDetail: action.payLoad,
        loadingDetail: false,
        error: ''
      }
    case FETCH_NOTEBOOK_DETAIL_ERROR:
      return {
        ...state,
        loadingDetail: false,
        error: action.payLoad
      }
    default:
      return state
  }
}
