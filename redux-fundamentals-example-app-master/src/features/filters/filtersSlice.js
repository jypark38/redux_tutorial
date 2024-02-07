export const StatusFilters = {
  All: 'all',
  Active: 'active',
  Completed: 'completed',
}

const initialState = {
  status: StatusFilters.All,
  colors: [],
}

export default function filtersReducer(state = initialState, action) {
  switch (action.type) {
    //{type: 'filters/statusFilterChanged', payload: filterValue}
    case 'filters/statusFilterChanged': {
      return {
        ...state,
        status: action.payload,
      }
    }
    //{type: 'filters/colorFilterChanged', payload: {color, changeType}}
    case 'filters/colorFilterChanged': {
      console.log('!!')
      const { color, changeType } = action.payload
      const { colors } = state

      switch (changeType) {
        case 'added': {
          if (colors.includes(color)) {
            return state
          }
          return {
            ...state,
            colors: state.colors.concat(color),
          }
        }
        case 'removed': {
          return {
            ...state,
            colors: state.colors.filter(
              (existingColor) => existingColor !== color
            ),
          }
        }
        default:
          return state
      }
    }
    default:
      return state
  }
}

export const colorFilterChanged = (color, changeType) => {
  return {
    type: 'filters/colorFilterChanged',
    payload: { color, changeType },
  }
}
