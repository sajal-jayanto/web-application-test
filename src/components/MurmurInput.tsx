import { useState } from 'react'

const MurmurInput = () => {
  const [content, setContent] = useState('')
  const handlePost = () => {
    if (!content.trim()) return
    setContent('')
  }

  return (
    <div className="w-full p-4 bg-white rounded-xl shadow h-auto flex flex-col border border-gray-300 mb-5">
      <textarea
        rows={3}
        placeholder="What's on your mind?"
        className="w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex justify-start mt-4">
        <button
          className="py-2 w-full bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
          onClick={handlePost}
        >
          Post
        </button>
      </div>
    </div>
  )
}

export default MurmurInput
