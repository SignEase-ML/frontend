import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const LessonContainer = ({ lesson }) => {
  const [backgroundGradient, setBackgroundGradient] = useState('')

  // Function to generate a random background gradient
  const getRandomGradient = () => {
    const gradients = [
      'bg-gradient-to-r from-red-600 to-red-500',
      'bg-gradient-to-r from-green-600 to-green-500',
      'bg-gradient-to-r from-blue-600 to-blue-500',
      'bg-gradient-to-r from-yellow-600 to-yellow-500',
      'bg-gradient-to-r from-purple-600 to-purple-500',
      'bg-gradient-to-r from-pink-600 to-pink-500',
      'bg-gradient-to-r from-indigo-600 to-indigo-500',
    ]
    return gradients[Math.floor(Math.random() * gradients.length)]
  }

  useEffect(() => {
    const randomGradient = getRandomGradient()
    console.log('Random background gradient:', randomGradient)
    setBackgroundGradient(randomGradient)
  }, [])

  return (
    <section
      className={`text-white banner-container-style ${backgroundGradient}`}
    >
      <div className="relative p-4 z-10">
        {/* Header */}
        <div className="mb-4">
          <p className="font-bold opacity-80 uppercase tracking-wider text-shadow">
            Lesson {lesson.number}
          </p>
          <h4 className="font-bold text-2xl sm:text-3xl md:text-4xl text-shadow">
            {lesson.title}
          </h4>
        </div>

        {/* Content */}
        <ul className="sm:text-xl flex flex-col gap-2">
          {lesson.units.map((unit) => (
            <li key={unit.slug}>
              <Link
                to={`/lessons/${lesson.slug}/${unit.slug}`}
                className="exercise-style"
              >
                {unit.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default LessonContainer
