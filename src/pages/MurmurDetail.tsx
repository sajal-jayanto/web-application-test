import { AiOutlineLike } from 'react-icons/ai'
import { Layout } from '../components/Layout'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const MurmurDetail = () => {
  const navigate = useNavigate()
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
          <p className="py-1 text-lg font-semibold text-blue-900">Alice Chen</p>
          <p className="mt-[9px] ml-2 text-sm text-gray-600"> 2h ago</p>
        </div>
        <p className="text-sm text-gray-800">
          This is a short text post or status update. It fits nicely in a
          compact card. This is a short text post or status update. It fits
          nicely in a compact card. This is a short text post or status update.
          It fits nicely in a compact card.
        </p>
        <div className="flex justify-start mt-2">
          <button className="text-sm text-blue-600 hover:underline flex gap-1">
            <AiOutlineLike className="mt-[3px]" />
            17
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default MurmurDetail
