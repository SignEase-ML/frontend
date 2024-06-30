import React from 'react'
import { Link } from 'react-router-dom'

const LessonContainer = ({ lesson }) => {
  return (
    <section className="text-white banner-container-style bg-gradient-to-r from-orange-600 to-orange-500">
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
