export default function ImmageCard({ url, description, onPhotosClick }) {
  return (
    <div>
      <img src={url} alt={description} onClick={onPhotosClick} />
    </div>
  );
}