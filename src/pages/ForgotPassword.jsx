import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/Logo.svg'
import authService from '../services/auth.service'
import { toast } from 'react-toastify'
import { AiOutlineLoading } from 'react-icons/ai'

const ForgotPassword = () => {
  const formRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(formRef.current)
    const inputData = Object.fromEntries(formData.entries())

    setIsLoading(true)
    await authService
      .forgotPassword(inputData)
      .then(() => {
        formRef.current.reset()
        toast.success(
          'Password reset instructions have been sent to your email.',
          {
            position: 'top-right',
          }
        )
        navigate('/login')
      })
      .catch((error) => {
        toast.error(error || 'Failed to send password reset instructions', {
          position: 'top-right',
        })
      })
    setIsLoading(false)
  }

  return (
    <section
      id="forgot-password"
      className="w-full min-h-[calc(100vh-72px)] py-14 flex justify-center hero-bg"
    >
      {/* Forgot Password Form */}
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
        <h1 className="text-2xl font-bold mb-6 text-center">Forgot Password</h1>
        <p className="text-center mb-6">
          Enter your email address below and we'll send you password reset
          instructions.
        </p>
        {/* Fields Container */}
        <div className="w-full flex flex-col gap-4">
          {/* Email Field Wrapper */}
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
        </div>

        {/* Submit Button */}
        <button
          className="w-full mt-6 py-3 px-6 bg-primary hover:bg-primary-shade text-white font-bold rounded-xl"
          type="submit"
        >
          {isLoading ? (
            <AiOutlineLoading className="animate-spin h-6 w-6 mx-auto" />
          ) : (
            'Send Instructions'
          )}
        </button>

        {/* Back to Login Link */}
        <p className="mt-6 text-gray-500 dark:text-gray-400 text-center">
          Remembered your password?{' '}
          <Link
            to="/login"
            className="font-bold text-red-500 hover:text-primary-shade hover:underline"
          >
            Log in
          </Link>
        </p>
      </form>
    </section>
  )
}

export default ForgotPassword
