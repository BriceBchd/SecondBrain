type RegisterProps = {
  toggleAuthForm: () => void;
};

const Register = ({ toggleAuthForm }: RegisterProps) => {
  return (
    <div className='flex flex-col items-center justify-center w-full space-y-5'>
      <h2 className='text-2xl font-bold'>Register</h2>
      <form className='flex flex-col items-center justify-center w-full h-full space-y-3'>
        <input
          className='w-3/4 h-10 my-2 p-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500'
          type='text'
          placeholder='Username'
        />
        <input
          className='w-3/4 h-10 my-2 p-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500'
          type='text'
          placeholder='Email'
        />
        <input
          className='w-3/4 h-10 my-2 p-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500'
          type='password'
          placeholder='Password'
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
          Login
        </button>
      </form>
      <div className='flex flex-col items-center justify-center w-full space-y-2'>
        <p>{`Don't have an account ? `}</p>
        <div className='font-extrabold'>
          <button onClick={toggleAuthForm}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
