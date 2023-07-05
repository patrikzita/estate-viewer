import React from "react";

type ApartmentCardProps = {
  title: string;
  imgsrc: string;
};

const ApartmentCard: React.FC<ApartmentCardProps> = ({ title, imgsrc }) => {
  return (
    <div className="h-full cursor-pointer overflow-hidden rounded-lg border-2 border-gray-200 hover:shadow-lg">
      <img
        className="w-full object-cover object-center md:h-48"
        src={imgsrc}
        alt={title}
      />
      <div className="p-6">
        <h2 className="mb-1 font-medium  tracking-widest">{title}</h2>
      </div>
    </div>
  );
};

export default ApartmentCard;
