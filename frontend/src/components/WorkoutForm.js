import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()
  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You need to logged in first')
      return
    }
    const workout = { title, load, reps }

    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setEmptyFields([])
      setError(null)
      setTitle('')
      setLoad('')
      setReps('')
      dispatch({ type: 'CREATE_WORKOUT', payload: json })
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label for="title">Exercise Title:</label>
      <input
        id="title"
        name="title"
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Your favourite workout?"
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label name="load">Load (in kg):</label>
      <input
        id="load"
        name="load"
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        placeholder="0"
        value={load}
        className={emptyFields.includes('load') ? 'error' : ''}
      />

      <label>Number of Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        placeholder="0"
        className={emptyFields.includes('reps') ? 'error' : ''}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm