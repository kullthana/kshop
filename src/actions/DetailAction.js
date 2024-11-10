import axios from 'axios'
export const FETCH_NOTEBOOK_DETAIL_BEGIN = 'FETCH_NOTEBOOK_DETAIL_BEGIN'
export const FETCH_NOTEBOOK_DETAIL_SUCCESS = 'FETCH_NOTEBOOK_DETAIL_SUCCESS'
export const FETCH_NOTEBOOK_DETAIL_ERROR = 'FETCH_NOTEBOOK_DETAIL_ERROR'

export const fetchData = (id) => {
  return (dispatch) => {
    dispatch(fetchDataBegin())
    setTimeout(() => {
      axios
        .get('http://localhost:3030/products/' + id)
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
    type: FETCH_NOTEBOOK_DETAIL_BEGIN
  }
}

export const fetchDataSuccess = (value) => {
  return {
    type: FETCH_NOTEBOOK_DETAIL_SUCCESS,
    payLoad: value
  }
}

export const fetchDataError = (error) => {
  return {
    type: FETCH_NOTEBOOK_DETAIL_ERROR,
    payLoad: error
  }
}
