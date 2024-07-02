import ImageCard from "../ImageCard/ImageCard";

export default function ImageGallery({photos, onPhotosClick}) {
     return (
       <ul>
         {photos.map(({ id, urls: { small, regular }, description }) => (
           <li key={id}>
             <ImageCard
               url={small}
               description={description}
               onImageClick={() => onPhotosClick({ url: regular, description })}
             />
           </li>
         ))}
       </ul>
     );
  
}