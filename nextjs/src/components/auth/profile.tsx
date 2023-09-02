import { useState, useEffect } from 'react'
import PopupCard from '../popupCard'
import { PopupCardProps } from '../popupCard'

type ProfileProps = {
  toggleAuthForm: (authForm: string) => void
}

const Profile = ({ toggleAuthForm }: ProfileProps) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [showPopupCard, setShowPopupCard] = useState<boolean>(false)
  const [popupCard, setPopupCard] = useState<PopupCardProps>({
    title: '',
    message: '',
    color: '',
    onClose: () => {
      setShowPopupCard(false)
    },
  })

  useEffect(() => {
    const fetchProfile = async () => {
      const token = document.cookie.split('=')[1]
      const response = await fetch('http://localhost:3000/user/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const { username, email } = await response.json()
        setUsername(username)
        setEmail(email)
      } else {
        console.log('error')
      }
    }

    fetchProfile()
  }, [])

  const handleLogout = async () => {
    const token = document.cookie.split('=')[1]
    const response = await fetch('http://localhost:3000/user/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (response.ok) {
      document.cookie = `token=; SameSite=None; Secure; expires=Thu, 01 Jan 1970 00:00:00 GMT`
      setPopupCard({
        title: 'Success',
        message: 'Logout successful!',
        color: 'green',
        onClose: () => {
          setShowPopupCard(false)
        },
      })
      setShowPopupCard(true)
      setTimeout(() => {
        toggleAuthForm('login')
      }, 1000)
    } else {
      console.log('error')
    }
  }

  return (
    <div className='flex flex-col items-center w-full h-full mt-16 space-y-5'>
      <h2 className='text-2xl font-bold m-4'>Profile</h2>
      <div>
        <p>Username : {username}</p>
        <p>Email : {email}</p>
      </div>
      <button
        className='absolute bottom-16 w-3/4 h-10 my-2 p-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500'
        onClick={handleLogout}
      >
        Logout
      </button>
      {showPopupCard && <PopupCard {...popupCard} />}
    </div>
  )
}

export default Profile
