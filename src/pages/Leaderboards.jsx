import { Navigate } from 'react-router-dom'
import Auth from '../utils/auth'
import { AiOutlineLoading } from 'react-icons/ai'

const Leaderboards = () => {
  // If the user is not logged in, redirect to the login page
  if (!Auth.loggedIn()) return <Navigate to="/login" />

  // Dummy user data
  const dummyUsers = [
    { username: 'Alice', experience: 1500 },
    { username: 'Bob', experience: 1200 },
    { username: 'Charlie', experience: 900 },
    { username: 'David', experience: 800 },
    { username: 'Eve', experience: 700 },
  ]

  // sort the users by experience
  const sortedUsers = [...dummyUsers].sort(
    (a, b) => b.experience - a.experience
  )

  // style the first three rankings
  const rank = (index) => {
    switch (index) {
      case 0:
        return 'ranking-first-style'
      case 1:
        return 'ranking-second-style'
      case 2:
        return 'ranking-third-style'
      default:
        return ''
    }
  }

  return (
    <section id="leaderboard" className="w-full min-h-screen p-4 md:p-8">
      {/* Page Heading */}
      <h1 className="h1-style mb-8">Leaderboards</h1>

      {/* Banner */}
      <div className="mb-8 banner-container-style text-white text-shadow bg-gradient-to-r from-green-600 to-green-800">
        <div className="relative p-8 z-10">
          <h2 className="banner-heading mb-3">Rise to the top!</h2>
          <p className="text-lg">Be the best and compete with others.</p>
        </div>
        <div className="banner-bg-style bg-connections" />
      </div>

      {/* Leaderboard table */}
      <div className="box-container-style">
        <h2 className="text-xl font-bold mb-4">Rankings</h2>
        <div className="flex flex-col">
          {sortedUsers.map((user, index) => (
            <div
              key={`id-${user.username}`}
              className="w-auto flex items-center p-2 px-4 gap-4 rounded-xl odd:bg-slate-900/5 dark:odd:bg-slate-900/50"
            >
              <span className={`ranking-index-style ${rank(index)}`}>
                {index + 1}
              </span>
              <div className="w-12 h-12 shrink-0">
                <div className="w-12 h-12 bg-primary rounded-full flex justify-center items-center uppercase font-bold text-2xl text-white">
                  {user.username?.charAt(0).toUpperCase()}
                </div>
              </div>

              <div className="flex flex-col flex-grow overflow-hidden">
                <h3 className="font-bold truncate">{user.username}</h3>
                <p className="text-gray-500 dark:text-gray-400 truncate">
                  {user.experience} XP
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Leaderboards
