import { useState } from 'react'
import PopupCard from '../popupCard'
import { PopupCardProps } from '../popupCard'
import { AuthGoogle } from './authGoogle'

type RegisterProps = {
  toggleAuthForm: (authForm: string) => void
}

const Register = ({ toggleAuthForm }: RegisterProps) => {
  const [email, setEmail] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [showPopupCard, setShowPopupCard] = useState<boolean>(false)
  const [popupCard, setPopupCard] = useState<PopupCardProps>({
    title: '',
    message: '',
    color: '',
    onClose: () => {},
  })

  const toggleLoginForm = () => {
    toggleAuthForm('login')
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const response = await fetch('http://localhost:3000/user/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username, password }),
    })

    console.log(response)

    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getDate() + 30)
    const { token } = await response.json()
    document.cookie = `token=${token}; SameSite=None; Secure; expires=${expirationDate.toUTCString()}`

    if (response.ok) {
      setPopupCard({
        title: 'Success',
        message: 'Registration successful!',
        color: 'green',
        onClose: () => {
          setShowPopupCard(false)
        },
      })
      setShowPopupCard(true)
      setTimeout(() => {
        setShowPopupCard(false)
        toggleAuthForm('profile')
      }, 1000)
    } else {
      console.log('error')
    }
  }

  return (
    <div className='flex flex-col items-center w-full h-full mt-16'>
      <h2 className='text-2xl font-bold m-4'>Register</h2>
      <AuthGoogle />
      <form
        className='flex flex-col items-center justify-center w-full space-y-2 m-5 text-dark'
        onSubmit={handleSubmit}
      >
        <input
          className='w-3/4 h-10 p-2 rounded-md border focus:border-2 focus:outline-none'
          type='text'
          placeholder='Username'
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          className='w-3/4 h-10 p-2 rounded-md border focus:border-2 focus:outline-none'
          type='text'
          placeholder='Email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          className='w-3/4 h-10 p-2 rounded-md border focus:border-2 focus:outline-none'
          type='password'
          placeholder='Password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <input
          className='w-3/4 h-10 p-2 rounded-md border focus:border-2 focus:outline-none'
          type='password'
          placeholder='Confirm Password'
        />
        <button
          className='w-3/4 h-10 p-2 rounded-md border focus:outline hover:border-2'
          type='submit'
        >
          Register
        </button>
      </form>
      <div className='flex flex-col items-center justify-center w-full space-y-2'>
        <p>Already have an account ?</p>
        <div className='font-extrabold'>
          <button className='hover:underline' onClick={toggleLoginForm}>
            Login
          </button>
        </div>
      </div>
      {showPopupCard && <PopupCard {...popupCard} />}
    </div>
  )
}

export default Register
