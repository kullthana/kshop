import { FETCH_DATA_BEGIN, FETCH_DATA_ERROR, FETCH_DATA_SUCCESS } from '../actions/ActionsHome'

const initialState = {
  dataHome: [],
  error: '',
  loading: false
}

export const dataHomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_BEGIN:
      return {
        ...state,
        loading: true
      }

    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        dataHome: action.payLoad
      }
    case FETCH_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payLoad
      }
    default:
      return state
  }
}
