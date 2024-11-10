import axios from 'axios'
export const FETCH_CART_BEGIN = 'FETCH_CART_BEGIN'
export const FETCH_CART_SUCCESS = 'FETCH_CART_SUCCESS'
export const FETCH_CART_ERROR = 'FETCH_CART_ERROR'

export const fetchCartData = () => {
  return (dispatch) => {
    dispatch(fetchDataBegin())
    setTimeout(() => {
      axios
        .get('http://localhost:3030/carts')
        .then(function (response) {
          dispatch(fetchDataSuccess(response.data))
        })
        .catch(function (error) {
          dispatch(fetchDataError(error))
        })
    }, 1000)
  }
}

export const fetchDataBegin = () => {
  return {
    type: FETCH_CART_BEGIN
  }
}

export const fetchDataSuccess = (value) => {
  return {
    type: FETCH_CART_SUCCESS,
    payLoad: value
  }
}

export const fetchDataError = (error) => {
  return {
    type: FETCH_CART_ERROR,
    payLoad: error
  }
}
