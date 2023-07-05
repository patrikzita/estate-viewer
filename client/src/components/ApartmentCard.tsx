import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
type ApartmentCardProps = {
  title: string;
  imgsrc: string;
};
const ApartmentCard: React.FC<ApartmentCardProps> = ({ title, imgsrc }) => {
  return (
    <div className="h-full cursor-pointer overflow-hidden rounded-lg border-2 border-gray-200 hover:shadow-lg">
      <LazyLoadImage
        alt={title}
        src={imgsrc}
        effect="blur"
        placeholderSrc="placeholder.jpg"
      />
      <div className="p-6">
        <h2 className="mb-1 font-medium tracking-widest">{title}</h2>
      </div>
    </div>
  );
};

export default ApartmentCard;
