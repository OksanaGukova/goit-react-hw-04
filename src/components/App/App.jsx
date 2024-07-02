import { useEffect, useState } from "react";
import ImageGallery from "../ImageGallery/ImageGallery";
import SearchBar from "../SearchBar/SearchBar"
import { fetchImages } from "./api";


export default function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!query) return;

    const getImages = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const { results, total_pages } = await fetchImages(query, page);
        setImages((prev) => (page === 1 ? results : [...prev, ...results])); // скидаємо зображення, якщо новий запит
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
    setPage(1); // Скидання сторінки до 1 при новому пошуку
    setImages([]); // Очистити зображення при новому пошуку
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <p>Loading...</p>}
      {error && <p>Error fetching images</p>}
      <ImageGallery photos={images} onPhotosClick={handleImageClick} />
      {totalPages > page && !isLoading && (
        <button onClick={() => setPage((prevPage) => prevPage + 1)}>
          Load more
        </button>
      )}
      {selectedImage && (
        <div className="modal" onClick={closeModal}>
          <img src={selectedImage.url} alt={selectedImage.description} />
          <p>{selectedImage.description}</p>
        </div>
      )}
    </div>
  );
}
