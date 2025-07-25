const Pagination = ({
  totalItem = 1,
  currentPage,
  onPageChange,
}: {
  totalItem: number
  currentPage: number
  onPageChange: (page: number) => void
}) => {
  const extra = totalItem % 10 > 0 ? 1 : 0
  const pagesCount = Array.from(
    { length: Math.floor(totalItem / 10) + extra },
    (_, i) => i + 1,
  )

  return (
    <div className="flex justify-center mb-10">
      {pagesCount.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 ml-2 rounded text-sm font-medium border border-gray-300 cursor-pointer ${
            page === currentPage
              ? 'bg-blue-900 text-white'
              : 'hover:bg-gray-100 text-gray-800'
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  )
}

export default Pagination
