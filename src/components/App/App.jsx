import { useEffect, useState } from "react";
import ImageGallery from "../ImageGallery/ImageGallery";
import SearchBar from "../SearchBar/SearchBar"
import { fetchImages } from "../../apiService/apiServise";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import ReactModal from "react-modal";
import css from './App.module.css'

export default function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [noResults, setNoResults] = useState(false);

  ReactModal.setAppElement("#root");

  useEffect(() => {
    if (!query) return;

    const getImages = async () => {
      setIsLoading(true);
      setError(false);
       setNoResults(false);
      try {
        const { results, total_pages } = await fetchImages(query, page);
         if (results.length === 0) {
           setNoResults(true); 
         }
        setImages((prev) => (page === 1 ? results : [...prev, ...results])); 
        setTotalPages(total_pages);
        
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getImages();
  }, [query, page]);

  const handleSearch = (searchQuery) => {
    if (searchQuery === query) return;
    setQuery(searchQuery);
    setPage(1); 
    setImages([]);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

    const loadMoreImages = () => {
      setPage((prevPage) => prevPage + 1);
    };
  
    const closeModal = () => {
      setSelectedImage(null);
    };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      {error && <p>{error}</p>}
      {noResults && <p className={css.noResults}>No images found </p>}
      <ImageGallery photos={images} onPhotosClick={handleImageClick} />
      {isLoading && <Loader />}
      {totalPages > page && !isLoading && (
        <LoadMoreBtn onClick={loadMoreImages} />
      )}
      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          onRequestClose={closeModal}
          image={selectedImage}
        />
      )}
    </div>
  );
}
