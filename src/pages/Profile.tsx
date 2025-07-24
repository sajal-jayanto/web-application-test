import { Layout } from '../components/Layout'
import { AiOutlineLike } from 'react-icons/ai'
import MurmurCard from '../components/MurmurCard'
import { useEffect, useState } from 'react'
import { MurmurType, UserType } from '../@types/types'
import { axios_client } from '../http/client/axios'
import { useParams } from 'react-router-dom'

const Profile = () => {
  const [user, setUser] = useState<UserType>()
  const [murmurs, setMurmurs] = useState<MurmurType[]>([])
  const [total, setTotal] = useState<number>()
  const { id } = useParams()

  const fetchData = async () => {
    const data = (await axios_client.get(`/users?id=${id}`)) as UserType
    setUser(data)
  }

  const fetchMyMurmur = async (userId) => {
    const data = (await axios_client.get(`murmurs/my?userId=${userId}`)) as {
      totalCount: number
      murmur: MurmurType[]
    }
    setMurmurs(data.murmur)
    setTotal(data.totalCount)
  }

  useEffect(() => {
    try {
      fetchData()
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    if (!user?.id) return
    try {
      fetchMyMurmur(user?.id)
    } catch (error) {
      console.log(error)
    }
  }, [user])

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-4">
        <div className="bg-white shadow rounded-xl p-6 mb-6 border border-gray-300">
          <div className="flex items-center space-x-4">
            <div>
              <p className="py-1 text-2xl font-semibold text-blue-900 -pointer cursor-pointer underline">
                {user?.userName}
              </p>
              <p className="text-gray-600">{user?.email}</p>
              <p className="text-sm text-gray-500">
                {user?.gender}, {user?.age} years old
              </p>
            </div>
          </div>
          <div className="flex space-x-6 mt-4 text-sm text-gray-600">
            <div>
              <span className="font-semibold text-gray-900">
                {user?.followerCount}{' '}
              </span>
              Followers
            </div>
            <div>
              <span className="font-semibold text-gray-900">{total} </span>
              Posts
            </div>
          </div>
        </div>
        <p className="text-lg font-bold mb-4 border-b border-gray-300">
          Your Murmur
        </p>
        {murmurs.length > 0 &&
          murmurs?.map((murmur) => (
            <MurmurCard
              key={murmur.id}
              murmur={murmur}
              onLike={() => fetchMyMurmur(user?.id)}
            />
          ))}
      </div>
    </Layout>
  )
}

export default Profile
