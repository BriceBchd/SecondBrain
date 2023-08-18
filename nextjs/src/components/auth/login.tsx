import { useState } from 'react'
import PopupCard from '../popupCard'
import { PopupCardProps } from '../popupCard'

type LoginProps = {
  toggleAuthForm: (authForm: string) => void
}

const Login = ({ toggleAuthForm }: LoginProps) => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [showPopupCard, setShowPopupCard] = useState<boolean>(false)
  const [popupCard, setPopupCard] = useState<PopupCardProps>({
    title: '',
    message: '',
    color: '',
    onClose: () => {},
  })

  const toggleRegisterForm = () => {
    toggleAuthForm('register')
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const response = await fetch('http://localhost:3000/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })

    console.log(response)

    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getDate() + 30)
    const { token } = await response.json()
    document.cookie = `token=${token}; SameSite=None; Secure; expires=${expirationDate.toUTCString()}`

    if (response.ok) {
      setPopupCard({
        title: 'Success',
        message: 'Login successful!',
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
      setPopupCard({
        title: 'Error',
        message: 'Login failed : ' + response.statusText,
        color: 'red',
        onClose: () => {
          setShowPopupCard(false)
        },
      })
      setShowPopupCard(true)
      // wait a second before hiding the popup card
      setTimeout(() => {
        setShowPopupCard(false)
      }, 3000)
    }
  }

  return (
    <div className='flex flex-col items-center w-full h-full mt-16 space-y-5'>
      <h2 className='text-2xl font-bold m-4'>Login</h2>
      <form
        className='flex flex-col items-center justify-center w-full space-y-2'
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
          type='password'
          placeholder='Password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button
          className='w-3/4 h-10 p-2 rounded-md border focus:border-2 focus:outline-none'
          type='submit'
        >
          Login
        </button>
      </form>
      <div className='flex flex-col items-center justify-center w-full space-y-2'>
        <p>{`Don't have an account ? `}</p>
        <div className='font-extrabold'>
          <button className='hover:underline' onClick={toggleRegisterForm}>
            Sign Up
          </button>
        </div>
      </div>
      {showPopupCard && (
        <PopupCard
          title={popupCard.title}
          message={popupCard.message}
          color={popupCard.color}
          onClose={popupCard.onClose}
        />
      )}
    </div>
  )
}

export default Login
