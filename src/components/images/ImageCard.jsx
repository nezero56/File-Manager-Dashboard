import { MdImage } from 'react-icons/md'
import { timeAgo, formatDate } from '../../hooks/useTime'
import { useImages } from '../../context/ImageContext'

export default function ImageCard({ image, compact = false }) {
  const { dispatch } = useImages()

  return (
    <div
      onClick={() => dispatch({ type: 'SELECT_IMAGE', payload: image })}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all group"
    >
      <div className={`relative overflow-hidden bg-gray-100 ${compact ? 'h-28' : 'h-40'}`}>
        <img
          src={image.url}
          alt={image.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
      </div>
      <div className="p-3">
        <div className="flex items-center gap-1.5 mb-1">
          <MdImage size={13} className="text-primary shrink-0" />
          <p className="text-[11px] text-gray-400">{formatDate(image.createdAt)}</p>
        </div>
        <p className="text-sm font-semibold text-[#232d42] truncate">{image.name}</p>
        <p className="text-xs text-gray-400 mt-0.5">Opened {timeAgo(image.lastOpenedAt)}</p>
      </div>
    </div>
  )
}
