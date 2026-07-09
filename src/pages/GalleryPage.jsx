import { Link } from 'react-router-dom'
import Gallery from '../components/Gallery'
import { HiArrowLeft } from 'react-icons/hi'

function GalleryPage() {
  return (
    <main className="gallery-page">
      <Link to="/" className="btn gallery-page__back">
        <HiArrowLeft /> Back
      </Link>
      <Gallery />
    </main>
  )
}

export default GalleryPage
