import { Navigate } from 'react-router-dom'
import Auth from '../utils/auth'
import { LessonContainer } from '../components'

const Lessons = () => {
  // If the user is not logged in, redirect to the login page
  if (!Auth.loggedIn()) return <Navigate to="/login" />

  // Dummy user data for UI purposes
  const user = { username: 'SampleUser' }
  const lessonData = [
    {
      number: 0,
      title: 'Introduction to ASL',
      slug: 'introduction-to-asl',
      units: [
        {
          title: 'Alphabet in ASL',
          slug: 'alphabet-in-asl',
          content: [
            {
              id: 1,
              title: 'ASL Alphabet Overview',
              description:
                'Learn the American Sign Language (ASL) alphabet and its importance in communication.',
              videoUrl: 'https://www.example.com/asl/alphabet.mp4',
              keyPoints: [
                'Mastering hand shapes for each letter',
                'Practice sessions for learning ASL alphabet',
                'Understanding fingerspelling and its applications',
              ],
            },
            {
              id: 2,
              title: 'Fingerspelling Techniques',
              description:
                'Explore advanced techniques and tips for efficient fingerspelling in ASL.',
              videoUrl: 'https://www.example.com/asl/fingerspelling.mp4',
              keyPoints: [
                'Speed and accuracy in fingerspelling',
                'Common mistakes to avoid in fingerspelling',
                'Practical exercises to improve fingerspelling skills',
              ],
            },
          ],
        },
      ],
    },
  ]

  return (
    <section id="lessons" className="w-full min-h-screen p-4 md:p-8">
      <h1 className="h1-style mb-8">Lessons</h1>
      {/* Banner */}
      <div className="mb-8 banner-container-style text-white text-shadow bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="relative p-8 z-10">
          <h2 className="banner-heading mb-3">Welcome {user.username}!</h2>
          <p className="text-lg">Your journey to mastering ASL begins here</p>
        </div>
        <div className="banner-bg-style bg-parkay-floor" />
      </div>
      <div className="mb-8">
        <p>
          These quizzes are designed to help you practice the vocabulary and
          phrases you've learned in each lesson of{' '}
          <strong>American Sign Language (ASL)</strong>.
        </p>
        <br />
        <p>Select an exercise from a lesson to begin a quiz.</p>
      </div>

      {/* Lessons */}
      <div className="flex flex-col gap-4">
        {lessonData.map((lesson) => (
          <LessonContainer key={lesson.slug} lesson={lesson} />
        ))}
      </div>
    </section>
  )
}

export default Lessons
