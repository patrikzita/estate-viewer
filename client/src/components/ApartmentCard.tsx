import React from "react";

type ApartmentCardProps = {
  title: string;
  imgsrc: string;
};

const ApartmentCard: React.FC<ApartmentCardProps> = ({ title, imgsrc }) => {
  return (
    <div className="h-full border-2 cursor-pointer border-gray-200 rounded-lg overflow-hidden hover:shadow-lg">
      <img
        className="md:h-48 w-full object-cover object-center"
        src={imgsrc}
        alt={title}
      />
      <div className="p-6">
        <h2 className="tracking-widest font-medium  mb-1">{title}</h2>
      </div>
    </div>
  );
};

export default ApartmentCard;
