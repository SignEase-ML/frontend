import React from 'react'
import { aslData } from '../data/asl/aslData'
import QuizLesson from './QuizLesson'

const QuizChart = () => {
  return (
    <section id="QuizChart">
      <h3 className="font-bold mb-4 text-xl">Asl Chart</h3>
      {/* Asl Lessons */}
      <div className="flex flex-col gap-4">
        {aslData.map((lesson) => (
          <QuizLesson key={lesson.url} data={lesson} />
        ))}
      </div>
    </section>
  )
}

export default QuizChart
