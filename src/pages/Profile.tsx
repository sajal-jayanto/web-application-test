import { Layout } from '../components/Layout'
import { AiOutlineLike } from 'react-icons/ai'
import Murmur from '../components/Murmur'

const mockUser = {
  id: 1,
  userName: 'Alice Chen',
  email: 'alice@example.com',
  gender: 'female',
  age: 24,
  followerCount: 58,
  postCount: 3,
  murmurs: [
    {
      id: 1,
      content: 'Loving the vibes here 🌟',
      likeCount: 12,
    },
    {
      id: 2,
      content: 'Anyone up for a study group this weekend?',
      likeCount: 8,
    },
  ],
}

const Profile = () => {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-4">
        <div className="bg-white shadow rounded-xl p-6 mb-6 border border-gray-300">
          <div className="flex items-center space-x-4">
            <div>
              <p className="py-1 text-2xl font-semibold text-blue-900 -pointer cursor-pointer underline">
                Alice Chen
              </p>
              <p className="text-gray-600">{mockUser.email}</p>
              <p className="text-sm text-gray-500">
                {mockUser.gender}, {mockUser.age} years old
              </p>
            </div>
          </div>
          <div className="flex space-x-6 mt-4 text-sm text-gray-600">
            <div>
              <span className="font-semibold text-gray-900">
                {mockUser.followerCount}
              </span>{' '}
              Followers
            </div>
            <div>
              <span className="font-semibold text-gray-900">
                {mockUser.postCount}
              </span>{' '}
              Posts
            </div>
          </div>
        </div>
        <p className="text-lg font-bold mb-4 border-b border-gray-300">
          Your Murmur
        </p>
        <Murmur />
        <Murmur />
        <Murmur />
      </div>
    </Layout>
  )
}

export default Profile
