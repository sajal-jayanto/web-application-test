import { Layout } from '../components/Layout'
import { AiOutlineUserAdd } from 'react-icons/ai'
import MurmurCard from '../components/MurmurCard'
import { axios_client } from '../http/client/axios'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchUser } from '../http/services/user'
import { fetchMurmursByUserId } from '../http/services/Murmur'

const Profile = () => {
  const { id } = useParams()

  const { data: murmursData } = useQuery({
    queryKey: ['fetch-murmurs-by-userId'],
    queryFn: () => fetchMurmursByUserId(id),
  })

  const { data: userInfo } = useQuery({
    queryKey: ['fetch-user'],
    queryFn: () => fetchUser(id),
  })

  const postUserFollow = async (id) => {
    try {
      const data = (await axios_client.post(`/users/follow`, {
        userId: id,
      })) as any
      if (data.id) fetchUser(id)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-4">
        <div className="bg-white shadow rounded-xl p-6 mb-6 border border-gray-300">
          <div className="flex justify-between space-x-4">
            <div>
              <p className="py-1 text-2xl font-semibold text-blue-900 -pointer cursor-pointer underline">
                {userInfo?.userName}
              </p>
              <p className="text-gray-600">{userInfo?.email}</p>
              <p className="text-sm text-gray-500">
                {userInfo?.gender}, {userInfo?.age} years old
              </p>
            </div>
            <button
              className="flex items-center h-10 space-x-2 text-md bg-blue-900 cursor-pointer p-2 rounded-sm text-white"
              onClick={() => postUserFollow(userInfo?.id)}
            >
              <AiOutlineUserAdd />
              <span>Follow</span>
            </button>
          </div>
          <div className="flex space-x-6 mt-4 text-sm text-gray-600">
            <div>
              <span className="font-semibold text-gray-900">
                {userInfo?.followerCount}{' '}
              </span>
              Followers
            </div>
            <div>
              <span className="font-semibold text-gray-900">
                {murmursData?.totalCount}{' '}
              </span>
              Posts
            </div>
          </div>
        </div>
        <p className="text-lg font-bold mb-4 border-b border-gray-300">
          Your Murmur
        </p>
        {murmursData?.murmur.map((murmur) => (
          <MurmurCard
            key={murmur.id}
            murmur={murmur}
            invalidateKey="fetch-murmurs-by-userId"
          />
        ))}
      </div>
    </Layout>
  )
}

export default Profile
