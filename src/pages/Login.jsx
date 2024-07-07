import { useState, useRef } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import logo from '../assets/Logo.svg'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import { FaExclamationCircle } from 'react-icons/fa'
import { AiOutlineLoading } from 'react-icons/ai'
import Auth from '../utils/auth' // import the Auth utility function
import authService from '../services/auth.service'
import { toast } from 'react-toastify'

const Login = () => {
  if (Auth.loggedIn()) return <Navigate to="/lessons" />
  const [showPassword, setShowPassword] = useState(false) // state for toggling password visibility
  const formRef = useRef(null) // reference to the form element
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(formRef.current)
    const inputData = Object.fromEntries(formData.entries())

    setIsLoading(true)
    await authService
      .login(inputData)
      .then((response) => {
        formRef.current.reset()

        // Extract token and user data from the response
        const { access_token, user } = response.data

        // Store token and user data in localStorage
        localStorage.setItem('user', JSON.stringify(user))
        // Perform login
        Auth.login(access_token)

        // Navigate to home
        navigate('/')
      })
      .catch((error) => {
        console.log(error)
        toast.error(error || 'Login failed', {
          position: 'top-right',
        })
      })
    setIsLoading(false)
  }

  return (
    <section
      id="login"
      className="w-full min-h-[calc(100vh-72px)] py-14 flex justify-center hero-bg"
    >
      {/* Log In Form */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="form-container-style"
      >
        <img
          src={logo}
          alt="SignEase Logo"
          className="w-12 h-12 mx-auto mb-2"
        />
        <h1 className="text-2xl font-bold mb-6 text-center">Log in</h1>
        {/* Fields Container */}
        <div className="w-full flex flex-col gap-4">
          {/* Email Field Wrapper*/}
          <div className="flex flex-col gap-1">
            <label className="font-bold" htmlFor="email">
              Email
            </label>
            <input
              className="form-input-style px-3 py-2"
              type="email"
              id="email"
              name="email"
              required
            />
          </div>
          {/* Password Field Wrapper */}
          <div className="flex flex-col gap-1">
            <label className="font-bold" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="password-input"
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                autoComplete="off"
                required
              />
              {/* Show password button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-show-btn"
              >
                {showPassword ? <HiEyeOff /> : <HiEye />}
              </button>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          className="w-full mt-6 py-3 px-6 bg-primary hover:bg-primary-shade text-white font-bold rounded-xl"
          type="submit"
        >
          {isLoading ? (
            <AiOutlineLoading className="animate-spin h-6 w-6 mx-auto" />
          ) : (
            'Login'
          )}
        </button>
        {/* Sign Up Link */}
        <p className="mt-6 text-gray-500 dark:text-gray-400 text-center">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="font-bold text-red-500 hover:text-primary-shade hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </section>
  )
}

export default Login
