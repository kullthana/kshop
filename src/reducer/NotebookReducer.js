import {
  FETCH_DATA_BEGIN,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERROR,
  fetchDataBegin,
  fetchDataSuccess,
  fetchDataError,
  SUBMIT,
  SUBMIT_UPDATE,
  SUBMIT_REMOVE
} from '../actions/NotebookActions'
import axios from 'axios'

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

const initialState = {
  data: [],
  loading: false,
  err: '',
  Detailerr: '',
  targetData: null,
  targetId: null,
  loadingDetail: false
}
export const notebookReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_BEGIN:
      return {
        ...state,
        loading: true
      }
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        data: action.payLoad,
        loading: false
      }

    case FETCH_DATA_ERROR:
      return {
        ...state,
        loading: false,
        err: action.payLoad
      }

    case SUBMIT:
      axios
        .post('http://localhost:3030/carts', action.payLoad)
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
      return state

    case SUBMIT_UPDATE:
      axios
        .put('http://localhost:3030/carts/' + action.payLoad.id, action.payLoad)
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
      return state

    case SUBMIT_REMOVE:
      axios
        .delete('http://localhost:3030/carts/' + action.payLoad.id, action.payLoad)
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
      return state

    default:
      return state
  }
}
