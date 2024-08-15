import { useEffect } from "react";
import ImageGallery from "../ImageGallery/ImageGallery";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import ReactModal from "react-modal";
import css from "./App.module.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import {
  clearSelectedImage,
  fetchImagesAsync,
  setQuery,
  setSelectedImage,
  loadMoreImages as incrementPage,
} from "../../redux/imagesSlice";
import { persistor, store } from "../../redux/store";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  const dispatch = useDispatch();
  const {
    images,
    query,
    page,
    totalPages,
    isLoading,
    error,
    selectedImage,
    noResults,
  } = useSelector((state) => state.images);

  ReactModal.setAppElement("#root");

  useEffect(() => {
    if (!query) return;
    dispatch(fetchImagesAsync({ query, page }));
  }, [query, page, dispatch]);

  const handleSearch = (searchQuery) => {
    if (searchQuery === query) return;
    dispatch(setQuery(searchQuery));
  };

  const handleImageClick = (image) => {
    dispatch(setSelectedImage(image));
  };

  const handleLoadMore = () => {
    if (page < totalPages) {
      dispatch(incrementPage()); // Збільшуємо сторінку
      dispatch(fetchImagesAsync({ query, page: page + 1 })); // Завантажуємо зображення
    }
  };

  const closeModal = () => {
    dispatch(clearSelectedImage());
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div>
          <SearchBar onSubmit={handleSearch} />
          {error && <ErrorMessage message={error} />}
          {noResults && <p className={css.noResults}>No images found</p>}
          <ImageGallery photos={images} onPhotosClick={handleImageClick} />
          {isLoading && <Loader />}
          {totalPages > page && !isLoading && (
            <LoadMoreBtn onClick={handleLoadMore} />
          )}
          {selectedImage && (
            <ImageModal
              isOpen={!!selectedImage}
              onRequestClose={closeModal}
              image={selectedImage}
            />
          )}
        </div>
      </PersistGate>
    </Provider>
  );
}
