import React from 'react'
import PracticeLesson from './PracticeLesson'
import { aslData } from '../data/asl/aslData'

const PracticeChart = () => {
  return (
    <section id="PracticeChart">
      <h3 className="font-bold mb-4 text-xl">Practice Lesson</h3>
      {/* Asl Lessons */}
      <div className="flex flex-col gap-4">
        {aslData.map((lesson) => (
          <PracticeLesson key={lesson.url} data={lesson} />
        ))}
      </div>
    </section>
  )
}

export default PracticeChart
