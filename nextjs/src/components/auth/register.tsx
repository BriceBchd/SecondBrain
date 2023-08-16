import { useState } from 'react';

type RegisterProps = {
  toggleAuthForm: () => void;
};

const Register = ({ toggleAuthForm }: RegisterProps) => {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

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
    <div className='flex flex-col items-center justify-center w-full space-y-5'>
      <h2 className='text-2xl font-bold'>Register</h2>
      <form
        className='flex flex-col items-center justify-center w-full h-full space-y-5'
        onSubmit={handleSubmit}
      >
        <input
          className='w-3/4 h-10 my-2 p-2 rounded-md border border-gray-300 focus:outline focus:outline-offset-4'
          type='text'
          placeholder='Username'
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          className='w-3/4 h-10 my-2 p-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500'
          type='text'
          placeholder='Email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          className='w-3/4 h-10 my-2 p-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500'
          type='password'
          placeholder='Password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <input
          className='w-3/4 h-10 my-2 p-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500'
          type='password'
          placeholder='Confirm Password'
        />
        <button
          className='w-3/4 h-10 my-2 p-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500'
          type='submit'
        >
          Register
        </button>
      </form>
      <div className='flex flex-col items-center justify-center w-full space-y-2'>
        <p>Already have an account ?</p>
        <div className='font-extrabold'>
          <button onClick={toggleAuthForm}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
