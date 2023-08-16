import { useState } from 'react';
import PopupCard from '../popupCard';
import { PopupCardProps } from '../popupCard';

type RegisterProps = {
  toggleAuthForm: (authForm: string) => void;
};

const Register = ({ toggleAuthForm }: RegisterProps) => {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const toggleLoginForm = () => {
    toggleAuthForm('login');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch('http://localhost:3000/user/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username, password }),
    });

    console.log(response);

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);
    const { token } = await response.json();
    document.cookie = `token=${token}; SameSite=None; Secure; expires=${expirationDate.toUTCString()}`;

    if (response.ok) {
      console.log('success');
    } else {
      console.log('error');
    }
  };

  return (
    <div className='flex flex-col items-center w-full h-full mt-16 space-y-5'>
      <h2 className='text-2xl font-bold m-4'>Register</h2>
      <form
        className='flex flex-col items-center justify-center w-full space-y-2'
        onSubmit={handleSubmit}
      >
        <input
          className='w-3/4 h-10 p-2 rounded-md border border-gray-300 focus:border-2 focus:border-gray-300 focus:outline-none'
          type='text'
          placeholder='Username'
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          className='w-3/4 h-10 p-2 rounded-md border border-gray-300 focus:border-2 focus:border-gray-300 focus:outline-none'
          type='text'
          placeholder='Email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          className='w-3/4 h-10 p-2 rounded-md border border-gray-300 focus:border-2 focus:border-gray-300 focus:outline-none'
          type='password'
          placeholder='Password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <input
          className='w-3/4 h-10 p-2 rounded-md border border-gray-300 focus:border-2 focus:border-gray-300 focus:outline-none'
          type='password'
          placeholder='Confirm Password'
        />
        <button
          className='w-3/4 h-10 p-2 rounded-md border border-gray-300 focus:outline hover:border-2'
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
    </div>
  );
};

export default Register;
