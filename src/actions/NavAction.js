export const CHANGE_TOGGLE_STATE = 'CHANGE_TOGGLE_STATE'

export const setToggle = (toggle) => {
  return {
    type: CHANGE_TOGGLE_STATE,
    toggle: toggle
  }
}
