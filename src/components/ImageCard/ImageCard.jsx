export default function ImageCard({
  url,
  description,
  author,
  likes,
  onImageClick,
}) {
  return (
    <div onClick={onImageClick}>
      <img src={url} alt={description} />
      <p>{description}</p>
      <p>Author: {author}</p>
      <p>Likes: {likes}</p>
    </div>
  );
}
