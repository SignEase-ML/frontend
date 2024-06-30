import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import Auth from '../utils/auth'
import { Button } from '../components'

// Dummy data for the lessons
const lessons = [
  {
    id: 1,
    title: 'Introduction to React',
    description:
      'In this lesson, we will cover the basics of React, a popular JavaScript library for building user interfaces.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', // Sample video URL
    keyPoints: [
      'Understanding the Virtual DOM',
      'Creating React components',
      'Using JSX syntax',
      'Managing state and props',
      'Handling events',
    ],
  },
  {
    id: 2,
    title: 'State and Props in React',
    description:
      'In this lesson, we will delve deeper into managing state and props in React components.',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4', // Sample video URL
    keyPoints: [
      'Using useState hook',
      'Passing props to child components',
      'State management patterns',
      'Lifting state up',
      'Using context for state management',
    ],
  },
  // Add more lessons as needed
]

const VideoLessonPage = () => {
  if (!Auth.loggedIn()) return <Navigate to="/login" />

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [videoEnded, setVideoEnded] = useState(false)

  const currentLesson = lessons[currentLessonIndex]

  const handleVideoEnd = () => {
    setVideoEnded(true)
  }

  const handleNextLesson = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1)
      setVideoEnded(false)
    }
  }

  const handlePreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1)
      setVideoEnded(false)
    }
  }

  return (
    <section className="w-full min-h-screen p-4 md:p-8">
      {/* Page Heading */}
      <h1 className="h1-style mb-8">{currentLesson.title}</h1>

      {/* Video Player */}
      <div className="mb-8">
        <video className="w-full rounded-lg" controls onEnded={handleVideoEnd}>
          <source src={currentLesson.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Lesson Description */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Lesson Description</h2>
        <p>{currentLesson.description}</p>
      </div>

      {/* Key Points */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2">Key Points</h3>
        <ul className="list-disc pl-5">
          {currentLesson.keyPoints.map((point, index) => (
            <li key={index} className="mb-2">
              {point}
            </li>
          ))}
        </ul>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mb-8">
        <Button
          type="button"
          btnStyle={`text-white bg-gray-500 hover:bg-gray-700 px-4 py-2 rounded ${
            currentLessonIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handlePreviousLesson}
          disabled={currentLessonIndex === 0}
          title="Previous"
        />
        <Button
          type="button"
          btnStyle={`text-white bg-gray-500 hover:bg-gray-700 px-4 py-2 rounded ${
            currentLessonIndex === lessons.length - 1
              ? 'opacity-50 cursor-not-allowed'
              : ''
          }`}
          onClick={handleNextLesson}
          disabled={currentLessonIndex === lessons.length - 1}
          title="Next"
        />
      </div>
    </section>
  )
}

export default VideoLessonPage
