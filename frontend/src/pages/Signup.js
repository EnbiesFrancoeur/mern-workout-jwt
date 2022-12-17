import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'
import { Link } from 'react-router-dom'

const Signup = () => {
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const { signup, Error, IsLoading } = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(Email, Password)
  }

  return (
    <form
      className='Signup'
      onSubmit={handleSubmit}

    >
      <h3>Sign up</h3>
      <label htmlFor='email'>Email </label>
      <input type="email" name='email' id='email'
        value={Email}
        onChange={(e) => setEmail(e.target.value)} />

      <label htmlFor='password'>Password </label>
      <input type='password' name='password' id='password'
        value={Password}
        onChange={(e) => setPassword(e.target.value)} />

      <div className="button">
        <button disabled={IsLoading}>Sign up</button>
        <div>
          <span>Back to </span>
          <Link to="../login">Login</Link>
        </div>
      </div>
      {Error && <div className="error">{Error}</div>}
    </form>
  )
}


export default Signup