import { Layout } from '../components/Layout'
import Murmur from '../components/Murmur'
import MurmurInput from '../components/MurmurInput'

const Timeline = () => {
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
      <MurmurInput />
      <Murmur />
      <Murmur />
      <Murmur />
    </Layout>
  )
}

export default Timeline
