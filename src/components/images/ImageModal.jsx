import { useEffect } from 'react'
import { MdClose, MdImage } from 'react-icons/md'
import { useImages } from '../../context/ImageContext'
import { formatDate, timeAgo } from '../../hooks/useTime'

export default function ImageModal() {
  const { state, dispatch } = useImages()
  const img = state.selectedImage

  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') dispatch({ type: 'CLOSE_MODAL' }) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [dispatch])

  if (!img) return null

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={() => dispatch({ type: 'CLOSE_MODAL' })}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative">
          <img src={img.url} alt={img.name} className="w-full max-h-80 object-cover" />
          <button
            onClick={() => dispatch({ type: 'CLOSE_MODAL' })}
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-1.5 hover:bg-white shadow"
          >
            <MdClose size={18} />
          </button>
        </div>

        {/* Metadata */}
        <div className="px-6 py-5">
          <h3 className="text-lg font-bold text-[#232d42] mb-3">{img.name}</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Created',      value: formatDate(img.createdAt) },
              { label: 'Last Opened',  value: timeAgo(img.lastOpenedAt) },
              { label: 'Type',         value: 'JPEG Image' },
              { label: 'Size',         value: '2.4 MB' },
            ].map(({ label, value }) => (
              <div key={label} className="bg-pageBg rounded-lg px-4 py-3">
                <p className="text-[11px] text-gray-400 uppercase tracking-wide font-medium">{label}</p>
                <p className="text-sm font-semibold text-[#232d42] mt-0.5">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-5">
          <button
            onClick={() => dispatch({ type: 'CLOSE_MODAL' })}
            className="w-full py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
