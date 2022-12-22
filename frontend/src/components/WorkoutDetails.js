import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
  const [editedWorkout, setEditedWorkout] = useState(workout)
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()
  const [isEditing, setIsEditing] = useState(false)


  const handleDelete = async () => {
    if (!user) {
      return
    }
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`,
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json })
    }
  }

  const handleEdit = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
      body: JSON.stringify(editedWorkout)
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'EDIT_WORKOUT', payload: json })
      setIsEditing(!isEditing)
    }
  }

  return (
    <div className="workout-details">
      {isEditing ? (
        <form>
          <label>
            Exercise Title :
            <input type="text" value={editedWorkout.title} onChange={e => setEditedWorkout({ ...editedWorkout, title: e.target.value })} />
          </label>
          <label>
            Load (kg):
            <input type="number" value={editedWorkout.load} onChange={e => setEditedWorkout({ ...editedWorkout, load: e.target.value })} />
          </label>
          <label>
            Number of reps:
            <input type="number" value={editedWorkout.reps} onChange={e => setEditedWorkout({ ...editedWorkout, reps: e.target.value })} />
          </label>
        </form>
      ) : (
        <>
          <h4>{editedWorkout.title}</h4>
          <p><strong>Load (kg): </strong>{editedWorkout.load}</p>
          <p><strong>Number of reps: </strong>{editedWorkout.reps}</p>
        </>
      )}
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined trash-bin" onClick={handleDelete}>delete</span>
      <button className="material-symbols-outlined edit" onClick={handleEdit}>{isEditing ? 'save' : 'edit'}</button>
    </div>
  )
}

export default WorkoutDetails