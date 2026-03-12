import React from 'react'
import NestedComment from './components/NestedComment'
import commentsData from './data/comment.json'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6">
        
        <h1 className="text-2xl font-semibold text-center mb-6">
          Nested Comment System
        </h1>

        <NestedComment
          comments={commentsData}
          onSubmit={(content) => {}}
          onEdit={(content) => {}}
          onDelete={(commentId) => {}}
        />

      </div>

    </div>
  )
}

export default App