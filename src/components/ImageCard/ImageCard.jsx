import css from './ImageCard.module.css'

export default function ImageCard({ url, onImageClick }) {
  return (
    <div className={css.card} onClick={onImageClick}>
      <img src={url} alt="" className={css.image} />
    </div>
  );
}