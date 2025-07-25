import { Layout } from '../components/Layout'
import MurmurCard from '../components/MurmurCard'
import MurmurInput from '../components/MurmurInput'
import { useQuery } from '@tanstack/react-query'
import { fetchAllMurmurs } from '../http/services/Murmur'

const Timeline = () => {
  const { data: murmurs } = useQuery({
    queryKey: ['fetch-all-murmurs'],
    queryFn: () => fetchAllMurmurs(),
  })

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
      <MurmurInput invalidateKey="fetch-all-murmurs" />
      {murmurs?.map((murmur) => (
        <MurmurCard
          key={murmur.id}
          murmur={murmur}
          invalidateKey="fetch-all-murmurs"
        />
      ))}
    </Layout>
  )
}

export default Timeline
