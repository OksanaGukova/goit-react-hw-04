import { nanoid } from "nanoid";
import ImageCard from "../ImageCard/ImageCard";
import css from './ImageGallery.module.css'

export default function ImageGallery({ photos, onPhotosClick }) {
  return (
    <ul className={css.container}>
      {photos.map(({ urls: { small, regular }, description, user: { name }, likes }) => (
        <li className={css.photoContainer} key={nanoid()}>
          <ImageCard
            url={small}
            onImageClick={() =>
              onPhotosClick({
                url: regular,
                description,
                author: name,
                likes,
              })
            }
          />
        </li>
      ))}
    </ul>
  );
}