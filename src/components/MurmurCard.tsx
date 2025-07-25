import { AiOutlineLike } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { MurmurType } from '../@types/types'
import { getTimeAgo, truncateText } from '../utils/util'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { likeMurmurById } from '../http/services/Murmur'

const MurmurCard = ({
  murmur,
  invalidateKey,
}: {
  murmur: MurmurType
  invalidateKey: string
}) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate: likeMurmur } = useMutation({
    mutationFn: (murmurId: number) => likeMurmurById(murmurId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [invalidateKey] })
    },
    onError: (error) => {
      console.error('Error posting murmur:', error)
    },
  })

  const onLikeTheMurmur = () => likeMurmur(murmur.id)

  return (
    <div className="w-full p-4 bg-white rounded-xl shadow h-auto flex flex-col justify-between border border-gray-300 mb-5">
      <div className="flex">
        <p
          className="py-1 text-lg font-semibold text-blue-900 -pointer cursor-pointer underline"
          onClick={() => navigate(`/profile/${murmur.author.id}`)}
        >
          {murmur.author.userName}
        </p>
        <p className="mt-[9px] ml-2 text-sm text-gray-600">
          {getTimeAgo(murmur.createdAt)}
        </p>
      </div>
      <p
        className="text-sm text-gray-800 cursor-pointer hover:text-blue-700"
        onClick={() => navigate(`/murmur/${murmur.id}`)}
      >
        {truncateText(murmur.content)}
      </p>
      <div className="flex justify-start mt-2">
        <button
          className="text-sm text-blue-600 flex gap-[2px] cursor-pointer"
          onClick={onLikeTheMurmur}
        >
          <AiOutlineLike className="mt-[3px]" />
          {murmur.likeCount}
        </button>
      </div>
    </div>
  )
}

export default MurmurCard
