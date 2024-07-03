import css from './ImageCard.module.css'

export default function ImageCard({
  url,
  description,
  author,
  likes,
  onImageClick,
}) {
  return (
    <div className={css.card} onClick={onImageClick}>
      <img src={url} alt={description} className={css.image} />
      <div className={css.info}>
        <h3>{author}</h3>
        <p>{description}</p>
        <p>Likes: {likes}</p>
      </div>
    </div>
  );
}
