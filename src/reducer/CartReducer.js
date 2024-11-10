import { FETCH_CART_BEGIN, FETCH_CART_ERROR, FETCH_CART_SUCCESS } from '../actions/CartAction'

const initialState = {
  cartData: [],
  error: '',
  loading: false
}

export const dataCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CART_BEGIN:
      return {
        ...state,
        loading: true
      }

    case FETCH_CART_ERROR:
      return {
        ...state,
        loading: false,
        error: '',
        errorData: action.payLoad
      }
    case FETCH_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cartData: action.payLoad
      }
    default:
      return state
  }
}
