import { AiOutlineLike } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const Murmur = () => {
  const navigate = useNavigate()

  const showDetail = () => navigate('/murmur/1')
  const profileDetail = () => navigate('/profile/1')

  return (
    <div className="w-full p-4 bg-white rounded-xl shadow h-auto flex flex-col justify-between border border-gray-300 mb-5">
      <div className="flex">
        <p
          className="py-1 text-lg font-semibold text-blue-900 -pointer cursor-pointer underline"
          onClick={profileDetail}
        >
          Alice Chen
        </p>
        <p className="mt-[9px] ml-2 text-sm text-gray-600"> 2h ago</p>
      </div>
      <p
        className="text-sm text-gray-800 cursor-pointer hover:text-blue-700"
        onClick={showDetail}
      >
        This is a short text post or status update. It fits nicely in a compact
        card. This is a short text post or status update. It fits nicely in a
        compact card. This is a short text post or status update. It fits nicely
        in a compact card.
      </p>
      <div className="flex justify-start mt-2">
        <button className="text-sm text-blue-600 hover:underline flex gap-1">
          <AiOutlineLike className="mt-[3px]" />
          17
        </button>
      </div>
    </div>
  )
}

export default Murmur
