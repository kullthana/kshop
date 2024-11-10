import axios from 'axios'
export const FETCH_DATA_BEGIN = 'FETCH_DATA_BEGIN'
export const FETCH_DATA_ERROR = 'FETCH_DATA_ERROR'
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS'

export const fetchData = () => {
  return (dispatch) => {
    dispatch(fetchDataBegin())
    setTimeout(() => {
      axios
        .get('http://localhost:3030/products/')
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
    type: FETCH_DATA_BEGIN
  }
}

export const fetchDataSuccess = (dataHome) => {
  return {
    type: FETCH_DATA_SUCCESS,
    payLoad: dataHome
  }
}

export const fetchDataError = (error) => {
  return {
    type: FETCH_DATA_ERROR,
    payLoad: error
  }
}
