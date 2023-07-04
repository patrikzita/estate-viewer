import { Loader2 } from "lucide-react";
import React from "react";

type LoaderProps = {
  isFetching: boolean;
};
const Loader: React.FC<LoaderProps> = ({ isFetching }) => {
  if (!isFetching) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center">
      <Loader2 className="mr-2 h-16 w-16 animate-spin text-red-400" />
    </div>
  );
};

export default Loader;
[];
