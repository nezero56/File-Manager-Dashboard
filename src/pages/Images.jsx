import { MdAdd } from 'react-icons/md'
import { useImages } from '../context/ImageContext'
import ImageCard from '../components/images/ImageCard'
import ImageModal from '../components/images/ImageModal'

export default function Images() {
  const { state, dispatch, filteredImages, recentlyViewed } = useImages()

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#232d42]">Images</h1>
          <p className="text-sm text-gray-400 mt-0.5">File Manager / Images</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm">
          <MdAdd size={18} />Add Image
        </button>
      </div>

      {/* Recently Viewed */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h2 className="text-[15px] font-bold text-[#232d42] mb-4">Recently Viewed</h2>
        <div className="flex gap-4 overflow-x-auto pb-1 scrollbar-thin">
          {recentlyViewed.map(img => (
            <div key={img.id} className="min-w-[160px] max-w-[160px]">
              <ImageCard image={img} compact />
            </div>
          ))}
        </div>
      </div>

      {/* All Images */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <h2 className="text-[15px] font-bold text-[#232d42]">All Images</h2>
          <input
            type="text"
            placeholder="Search images…"
            value={state.searchTerm}
            onChange={e => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
            className="w-full sm:w-56 text-sm bg-pageBg rounded-lg px-4 py-2 outline-none text-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-primary/30"
          />
        </div>

        {filteredImages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mb-4 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm font-medium">No images found</p>
            <p className="text-xs mt-1">Try adjusting your search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredImages.map(img => (
              <ImageCard key={img.id} image={img} />
            ))}
          </div>
        )}
      </div>

      <ImageModal />
    </div>
  )
}
