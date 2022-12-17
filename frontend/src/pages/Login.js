import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import { Link } from 'react-router-dom'

const Login = () => {
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const { login, Error, IsLoading } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(Email, Password)
  }

  return (
    <form
      className='Login'
      onSubmit={handleSubmit}
    >
      <h3>Log in</h3>
      <label htmlFor='email'>Email </label>
      <input type="email" name='email' id='email'
        value={Email}
        onChange={(e) => setEmail(e.target.value)} />

      <label htmlFor='password'>Password </label>
      <input type='password' name='password' id='password'
        value={Password}
        onChange={(e) => setPassword(e.target.value)} />

      <div className='button'>
        <button disabled={IsLoading}>Log in</button>
        <div>
          <span>Dont have an account ? </span>
          <Link to="../signup">Sign up</Link>
        </div>
      </div>
      {Error && <div className='error'>{Error}</div>}

    </form>
  )
}


export default Login