import { Layout } from '../components/Layout'
import MurmurCard from '../components/MurmurCard'
import MurmurInput from '../components/MurmurInput'
import { useQuery } from '@tanstack/react-query'
import { fetchAllMurmurs } from '../http/services/Murmur'
import Pagination from '../components/Pagination'
import { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'

const Timeline = () => {
  const [selectedPage, setSelectedPage] = useState(1)

  const { data: murmursData } = useQuery({
    queryKey: ['fetch-all-murmurs', selectedPage],
    queryFn: () => fetchAllMurmurs(selectedPage),
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

      {selectedPage === 1 ? (
        <MurmurInput invalidateKey="fetch-all-murmurs" />
      ) : (
        <button
          className="flex items-center space-x-2 text-sm text-blue-600 cursor-pointer hover:bg-blue-100 p-2 rounded-sm mb-2"
          onClick={() => setSelectedPage(1)}
        >
          <FaArrowLeft className="h-4 w-4" />
          <span>First page</span>
        </button>
      )}
      {murmursData?.murmurs?.map((murmur) => (
        <MurmurCard
          key={murmur.id}
          murmur={murmur}
          invalidateKey="fetch-all-murmurs"
        />
      ))}
      <Pagination
        totalItem={murmursData?.totalCount || 1}
        currentPage={selectedPage}
        onPageChange={setSelectedPage}
      />
    </Layout>
  )
}

export default Timeline
