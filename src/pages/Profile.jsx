import { Navigate } from 'react-router-dom'
import moment from 'moment'
import Auth from '../utils/auth'
import { AiOutlineLoading } from 'react-icons/ai'
import { useMe } from '../hooks/UseMe'

const Profile = () => {
  // If the user is not logged in, redirect to the login page
  if (!Auth.loggedIn()) return <Navigate to="/login" />

  const { data, isFetching, refetch: refetchLesson } = useMe()

  // Check if data is loading
  if (isFetching) {
    return <AiOutlineLoading className="animate-spin h-12 w-12 mx-auto" />
  }

  // Format createdAt using moment
  const formattedDate = moment(data.createdAt).format('MMMM D, YYYY')

  return (
    <section id="profile" className="w-full min-h-screen p-4 md:p-8">
      {/* Page Heading */}
      <h1 className="h1-style mb-8">Profile</h1>

      {/* Profile Info */}
      <div className="box-container-style mb-8 flex flex-col sm:flex-row items-center gap-4">
        <div className="w-32 h-32 bg-primary rounded-full flex justify-center items-center uppercase font-bold text-6xl text-white">
          {data.username.charAt(0).toUpperCase()}
        </div>
        <div className="flex flex-col gap-2 text-center sm:text-left">
          <h2 className="text-2xl font-bold">{data.username}</h2>
          <p className="text-gray-500 dark:text-gray-400">{`Joined ${formattedDate}`}</p>
        </div>
      </div>

      {/* Profile Statistics */}
      <div className="box-container-style mb-8 flex flex-col gap-4">
        <h3 className="text-xl font-bold">Statistics</h3>
        <div>
          <h4 className="text-gray-500 dark:text-gray-400">Total XP:</h4>
          <h2 className="text-2xl font-bold">{data.pointXp}</h2>
        </div>
      </div>
    </section>
  )
}

export default Profile
