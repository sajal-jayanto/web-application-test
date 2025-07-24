import { useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
import MurmurCard from '../components/MurmurCard'
import MurmurInput from '../components/MurmurInput'
import { axios_client } from '../http/client/axios'
import { MurmurType } from '../@types/types'

const Timeline = () => {
  const [murmurs, setMurmurs] = useState<MurmurType[]>([])

  const fetchData = async () => {
    const data = (await axios_client.get('/murmurs')) as MurmurType[]
    setMurmurs(data)
  }

  useEffect(() => {
    try {
      fetchData()
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <Layout>
      <div className="text-center py-6">
        <p className="text-center text-4xl font-bold text-blue-900">
          Welcome to Murmur Verse
        </p>
        <p className="mt-1 text-lg font-medium text-gray-600">
          Discover what everyone is murmuring about
        </p>
      </div>
      <MurmurInput onCreate={fetchData} />
      {murmurs.map((murmur) => (
        <MurmurCard key={murmur.id} murmur={murmur} onLike={fetchData} />
      ))}
    </Layout>
  )
}

export default Timeline
