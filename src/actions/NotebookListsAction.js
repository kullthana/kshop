import axios from 'axios'
export const FETCH_NOTEBOOKLIST = 'FETCH_NOTEBOOKLIST'
export const FETCH_DATA_LIST_SUCCESS = 'FETCH_DATA_LIST_SUCCESS'
export const FETCH_DATA_LIST_ERROR = 'FETCH_DATA_LIST_ERROR'
export const SEARCH_NOTEBOOKLIST = 'SEARCH_NOTEBOOKLIST'
export const FILTER_NOTEBOOKLIST = 'FILTER_NOTEBOOKLIST'

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
    type: FETCH_NOTEBOOKLIST
  }
}

export const fetchDataSuccess = (value) => {
  return {
    type: FETCH_DATA_LIST_SUCCESS,
    payLoad: value
  }
}

export const fetchDataError = (error) => {
  return {
    type: FETCH_DATA_LIST_ERROR,
    payLoad: error
  }
}

export const searchNotebookLists = (value) => {
  return {
    type: SEARCH_NOTEBOOKLIST,
    payLoad: value
  }
}

export const filter = (value) => {
  return {
    type: FILTER_NOTEBOOKLIST,
    payLoad: value
  }
}
