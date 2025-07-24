import { AiOutlineLike } from 'react-icons/ai'
import { Layout } from '../components/Layout'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { MurmurType } from '../@types/types'
import { useEffect, useState } from 'react'
import { axios_client } from '../http/client/axios'
import { getTimeAgo } from '../utils/util'

const MurmurDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [murmur, setMurmur] = useState<MurmurType>()

  const fetchData = async () => {
    const data = (await axios_client.get(
      `/murmurs/find?murmurId=${id}`,
    )) as MurmurType
    setMurmur(data)
  }

  useEffect(() => {
    try {
      fetchData()
    } catch (error) {
      console.log(error)
    }
  }, [])

  const onLikeTheMurmur = async () => {
    try {
      const data = (await axios_client.post(
        `/murmurs/like?murmurId=${murmur?.id}`,
      )) as any
      if (data.affected >= 1) fetchData()
    } catch (error) {
      console.log(error)
    }
  }

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
