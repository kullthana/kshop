export const FETCH_DATA_BEGIN = 'FETCH_DATA_BEGIN'
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS'
export const FETCH_DATA_ERROR = 'ERROR'
export const SUBMIT = 'SUBMIT'
export const SUBMIT_UPDATE = 'SUBMIT_UPDATE'

export const fetchDataBegin = () => {
  return {
    type: FETCH_DATA_BEGIN
  }
}

export const fetchDataSuccess = (data) => {
  return {
    type: FETCH_DATA_SUCCESS,
    payLoad: data
  }
}

export const fetchDataError = (error) => {
  return {
    type: FETCH_DATA_ERROR,
    payLoad: error
  }
}

export const SubmitAction = (data) => {
  return {
    type: SUBMIT,
    payLoad: data
  }
}

export const SubmitUpdateAction = (data) => {
  return {
    type: SUBMIT_UPDATE,
    payLoad: data
  }
}
