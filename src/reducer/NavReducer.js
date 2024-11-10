import { CHANGE_TOGGLE_STATE } from '../actions/NavAction'
const CHANGE_KEY = 'CHANGE_KEY'
const CHANGE_SHOW = 'CHANGE_SHOW'

export const setKey = (value) => {
  return {
    type: CHANGE_KEY,
    key: value
  }
}

export const setSearchShow = () => {
  return {
    type: CHANGE_SHOW,
    show: true
  }
}
const initialState = {
  toggle: true,
  key: '1'
}

export const NavReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_TOGGLE_STATE:
      return state.toggle === true
        ? {
            ...state,
            toggle: false
          }
        : { ...state, toggle: true }
    case CHANGE_KEY:
      return {
        ...state,
        key: action.key
      }
    case CHANGE_SHOW:
      return {
        ...state,
        show: action.show
      }
    default:
      return state
  }
}

export default NavReducer
