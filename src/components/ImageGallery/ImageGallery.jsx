import ImageCard from "../ImageCard/ImageCard";
import css from './ImageGallery.module.css'

export default function ImageGallery({ photos, onPhotosClick }) {
  return (
    <ul className={css.container}>
      {photos.map(
        ({
          id,
          urls: { small, regular },
          description,
          user: { name, portfolio_url },
          likes,
        }) => (
          <li className={css.photoContainer} key={id}>
            <ImageCard
              url={small}
              description={description}
              author={name}
              likes={likes}
              portfolio={portfolio_url}
              onImageClick={() =>
                onPhotosClick({
                  url: regular,
                  description,
                  author: name,
                  likes,
                  portfolio: portfolio_url,
                })
              }
            />
          </li>
        )
      )}
    </ul>
  );
}