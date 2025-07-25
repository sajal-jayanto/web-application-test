import { useState } from 'react'
import { axios_client } from '../http/client/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createMurmur } from '../http/services/Murmur'

const MurmurInput = ({ invalidateKey }: { invalidateKey: string }) => {
  const [content, setContent] = useState('')
  const queryClient = useQueryClient()

  const { mutate: postMurmur } = useMutation({
    mutationFn: (content: string) => createMurmur(content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [invalidateKey] })
      setContent('')
    },
    onError: (error) => {
      console.error('Error posting murmur:', error)
    },
  })

  const handlePost = () => {
    if (!content.trim()) return
    postMurmur(content)
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
