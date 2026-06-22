import { createContext, useContext, useReducer, useEffect } from 'react'
import { images as mockImages } from '../data/images'

const ImageContext = createContext(null)

const initialState = {
  images: [],
  searchTerm: '',
  selectedImage: null,
}

function reducer(state, action) {
  switch (action.type) {
    case 'INIT':         return { ...state, images: action.payload }
    case 'SET_SEARCH':   return { ...state, searchTerm: action.payload }
    case 'SELECT_IMAGE': return { ...state, selectedImage: action.payload }
    case 'CLOSE_MODAL':  return { ...state, selectedImage: null }
    default:             return state
  }
}

export function ImageProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({ type: 'INIT', payload: mockImages })
  }, [])

  const filteredImages = state.images.filter(img =>
    img.name.toLowerCase().includes(state.searchTerm.toLowerCase())
  )

  const recentlyViewed = [...state.images]
    .sort((a, b) => new Date(b.lastOpenedAt) - new Date(a.lastOpenedAt))
    .slice(0, 6)

  return (
    <ImageContext.Provider value={{ state, dispatch, filteredImages, recentlyViewed }}>
      {children}
    </ImageContext.Provider>
  )
}

export const useImages = () => useContext(ImageContext)
