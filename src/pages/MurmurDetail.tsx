import { AiOutlineLike } from 'react-icons/ai'
import { Layout } from '../components/Layout'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import { getTimeAgo } from '../utils/util'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchMurmursById, likeMurmurById } from '../http/services/Murmur'

const MurmurDetail = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { id } = useParams()

  const { data: murmur } = useQuery({
    queryKey: ['fetch-murmur-by-id'],
    queryFn: () => fetchMurmursById(id),
  })

  const { mutate: likeMurmur } = useMutation({
    mutationFn: (murmurId: number) => likeMurmurById(murmurId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetch-murmur-by-id'] })
    },
    onError: (error) => {
      console.error('Error posting murmur:', error)
    },
  })

  const onLikeTheMurmur = () => likeMurmur(Number(id))

  return (
    <Layout>
      <button
        className="flex items-center space-x-2 text-sm text-blue-600 cursor-pointer hover:bg-blue-100 p-2 rounded-sm"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft className="h-4 w-4" />
        <span>Back</span>
      </button>
      <div className="w-full p-4 bg-white rounded-xl shadow h-auto flex flex-col justify-between border border-gray-300 mb-5 mt-5">
        <div className="flex">
          <p className="py-1 text-lg font-semibold text-blue-900">
            {murmur?.author.userName}
          </p>
          <p className="mt-[9px] ml-2 text-sm text-gray-600">
            {getTimeAgo(murmur?.createdAt)}
          </p>
        </div>
        <p className="text-sm text-gray-800">{murmur?.content}</p>
        <div className="flex justify-start mt-2">
          <button
            className="text-sm text-blue-600 flex gap-[2px] cursor-pointer"
            onClick={onLikeTheMurmur}
          >
            <AiOutlineLike className="mt-[3px]" />
            {murmur?.likeCount}
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default MurmurDetail
