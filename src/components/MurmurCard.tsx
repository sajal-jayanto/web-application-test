import { AiOutlineLike } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { MurmurType } from '../@types/types'
import { getTimeAgo, truncateText } from '../utils/util'
import { axios_client } from '../http/client/axios'

const MurmurCard = ({
  murmur,
  onLike,
}: {
  murmur: MurmurType
  onLike?: () => void
}) => {
  const navigate = useNavigate()

  const onLikeTheMurmur = async () => {
    try {
      const data = (await axios_client.post(
        `/murmurs/like?murmurId=${murmur.id}`,
      )) as any
      if (onLike && data.affected >= 1) onLike()
    } catch (error) {
      console.log(error)
    }
  }

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
