import { Layout } from '../components/Layout'
import { AiOutlineUserAdd } from 'react-icons/ai'
import MurmurCard from '../components/MurmurCard'
import { axios_client } from '../http/client/axios'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchUser, followUser } from '../http/services/user'
import { fetchMurmursByUserId } from '../http/services/Murmur'
import { useEffect, useState } from 'react'

const Profile = () => {
  const { id } = useParams()
  const queryClient = useQueryClient()
  const [isFriend, setIsFriend] = useState<boolean | null>(null)

  const { data: murmursData } = useQuery({
    queryKey: ['fetch-murmurs-by-userId'],
    queryFn: () => fetchMurmursByUserId(id),
  })

  const { data: userProfile } = useQuery({
    queryKey: ['fetch-user', id],
    queryFn: () => fetchUser(id),
  })

  /// We are login as the first user
  // after login we have this information so no need to call then
  const { data: loginUserProfile } = useQuery({
    queryKey: ['login-fetch-user', 1],
    queryFn: () => fetchUser(1),
  })

  const { mutate: postFollowUser } = useMutation({
    mutationFn: (userId: number) => followUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetch-murmurs-by-userId'] })
      queryClient.invalidateQueries({ queryKey: ['fetch-user', id] })
      queryClient.invalidateQueries({ queryKey: ['login-fetch-user', 1] })
    },
    onError: (error) => {
      console.error('Error posting murmur:', error)
    },
  })

  useEffect(() => {
    if (!userProfile || !loginUserProfile) return
    if (userProfile.id === loginUserProfile.id) return

    const isPresent = loginUserProfile.friends?.some(
      (friend) => friend.id === userProfile.id,
    )
    setIsFriend(!!isPresent)
  }, [loginUserProfile, userProfile])

  const postUserFollow = async (userId) => postFollowUser(userId)

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-4">
        <div className="bg-white shadow rounded-xl p-6 mb-6 border border-gray-300">
          <div className="flex justify-between space-x-4">
            <div>
              <p className="py-1 text-2xl font-semibold text-blue-900 -pointer cursor-pointer underline">
                {userProfile?.userName}
              </p>
              <p className="text-gray-600">{userProfile?.email}</p>
              <p className="text-sm text-gray-500">
                {userProfile?.gender}, {userProfile?.age} years old
              </p>
            </div>
            {isFriend != null && !isFriend && (
              <button
                className="flex items-center h-10 space-x-2 text-md bg-blue-900 cursor-pointer p-2 rounded-sm text-white"
                onClick={() => postUserFollow(userProfile?.id)}
              >
                <AiOutlineUserAdd />
                <span>Follow</span>
              </button>
            )}
          </div>
          <div className="flex space-x-6 mt-4 text-sm text-gray-600">
            <div>
              <span className="font-semibold text-gray-900">
                {userProfile?.friends?.length}{' '}
              </span>
              Following
            </div>
            <div>
              <span className="font-semibold text-gray-900">
                {userProfile?.followerCount}{' '}
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
