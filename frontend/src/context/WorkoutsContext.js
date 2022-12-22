import { createContext, useReducer } from 'react'

export const WorkoutsContext = createContext()

export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return { workouts: action.payload }
    case 'CREATE_WORKOUT':
      return { workouts: [action.payload, ...state.workouts] }
    case 'DELETE_WORKOUT':
      return {
        workouts: state.workouts.filter(workout => {
          return workout._id !== action.payload._id
        })
      }
    case 'PATCH_WORKOUT':
      const updatedWorkout = state.workouts.map(workout => {
        if (workout.id === action.payload.id) {
          return action.payload
        }
        return workout
      })
      return {
        ...state,
        workouts: updatedWorkout
      }
    default:
      return state
  }
}

export const WorkoutsContextProvider = ({ children }) => {
  const [workout, dispatch] = useReducer(workoutsReducer, {
    workouts: null
  })

  return (
    <WorkoutsContext.Provider value={{ ...workout, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  )
}