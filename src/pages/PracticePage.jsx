import React, { useState, useRef } from 'react'
import Webcam from 'react-webcam'
import { Button, FeedbackMessage } from '../components'

// Dummy data for the sign language gestures
const gestures = [
  {
    id: 1,
    imageUrl:
      'https://lead-academy.org/blog/wp-content/uploads/2022/06/How-to-Sign-the-Alphabet-in-BSL.webp', // Replace with actual image URL
    description: 'The sign for "Hello"',
  },
  {
    id: 2,
    imageUrl: 'https://example.com/sign2.jpg', // Replace with actual image URL
    description: 'The sign for "Thank you"',
  },
  // Add more gestures as needed
]

const PracticePage = () => {
  const [currentGestureIndex, setCurrentGestureIndex] = useState(0)
  const [capturedImage, setCapturedImage] = useState(null)
  const [feedbackStatus, setFeedbackStatus] = useState(null)
  const [feedbackAnswer, setFeedbackAnswer] = useState('')
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const webcamRef = useRef(null)

  const currentGesture = gestures[currentGestureIndex]

  const captureAndSubmit = () => {
    const imageSrc = webcamRef.current.getScreenshot()
    setCapturedImage(imageSrc)
    // Example: Set feedback status and answer based on some condition
    if (currentGestureIndex === 0) {
      setFeedbackStatus('correct')
      setFeedbackAnswer('The sign for "Hello" is correct!')
    } else {
      setFeedbackStatus('incorrect')
      setFeedbackAnswer('The sign for "Thank you" is incorrect!')
    }
    setShowFeedbackModal(true) // Show feedback modal after capture
    console.log('Submitted image:', imageSrc)
  }

  const handleNextGesture = () => {
    if (currentGestureIndex < gestures.length - 1) {
      setCurrentGestureIndex(currentGestureIndex + 1)
      setCapturedImage(null)
      setFeedbackStatus(null)
      setFeedbackAnswer('')
    }
  }

  const handlePreviousGesture = () => {
    if (currentGestureIndex > 0) {
      setCurrentGestureIndex(currentGestureIndex - 1)
      setCapturedImage(null)
      setFeedbackStatus(null)
      setFeedbackAnswer('')
    }
  }

  const toggleFeedbackModal = () => {
    setShowFeedbackModal(!showFeedbackModal)
  }

  return (
    <section className="w-full min-h-screen p-4 md:p-8">
      {/* Page Heading */}
      <h1 className="text-2xl font-bold mb-8">Practice Sign Language</h1>

      {/* Gesture Image and Description */}
      <div className="mb-8 max-w-lg mx-auto">
        <img
          src={currentGesture.imageUrl}
          alt={currentGesture.description}
          className="w-full rounded-lg mb-4"
        />
        <p className="text-lg text-center">{currentGesture.description}</p>
      </div>

      {/* Divider */}
      <hr className="my-8" />

      {/* Webcam */}
      <div className="mb-8 w-full max-w-lg mx-auto">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="rounded-lg"
          width="100%"
        />
        <div className="flex items-center justify-center mt-2">
          <Button
            type="button"
            btnStyle="text-white bg-green-500 hover:bg-blue-700 px-4 py-2 rounded"
            onClick={captureAndSubmit}
            title="Capture"
          />
        </div>
      </div>

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <FeedbackMessage
              questionState={feedbackStatus}
              answer={feedbackAnswer}
            />
            <Button
              type="button"
              btnStyle="text-white bg-green-500 hover:bg-blue-700 px-4 py-2 rounded mt-4"
              onClick={toggleFeedbackModal}
              title="Close"
            />
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mb-8">
        <Button
          type="button"
          btnStyle={`text-white bg-gray-500 hover:bg-gray-700 px-4 py-2 rounded ${
            currentGestureIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handlePreviousGesture}
          disabled={currentGestureIndex === 0}
          title="Previous"
        />
        <Button
          type="button"
          btnStyle={`text-white bg-gray-500 hover:bg-gray-700 px-4 py-2 rounded ${
            currentGestureIndex === gestures.length - 1
              ? 'opacity-50 cursor-not-allowed'
              : ''
          }`}
          onClick={handleNextGesture}
          disabled={currentGestureIndex === gestures.length - 1}
          title="Next"
        />
      </div>
    </section>
  )
}

export default PracticePage
