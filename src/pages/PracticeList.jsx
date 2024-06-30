import { Navigate } from 'react-router-dom'
import Auth from '../utils/auth'
import PracticeChart from '../components/PracticeChart'

const PracticeList = () => {
  // If the user is not logged in, redirect to the login page
  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />
  }

  return (
    <section id="PracticeList" className="w-full min-h-screen p-4 md:p-8">
      <div className="mb-8">
        {/* Page Heading */}
        <h1 className="h1-style mb-8">Practice</h1>

        {/* Banner */}
        <div className="banner-container-style text-white text-shadow bg-gradient-to-r from-purple-500 to-purple-900">
          <div className="relative p-8 z-10">
            <h2 className="banner-heading mb-3">
              Let's Practice Sign Language!
            </h2>
            <p className="text-lg">Practice make perfect</p>
          </div>
          <div className="banner-bg-style bg-clouds" />
        </div>
      </div>

      {/* Content */}
      <div>
        <div>
          <PracticeChart />
        </div>
      </div>
    </section>
  )
}

export default PracticeList
