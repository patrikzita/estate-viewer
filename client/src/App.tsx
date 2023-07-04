import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ApartmentCard from "./components/ApartmentCard";
import SkeletonCard from "./components/SkeletonCard";

type Apartment = {
  title: string;
  imgsrc: string;
  id: string;
};

function App() {
  const [page, setPage] = useState<number>(1);
  const fetchApartmens = async (page: number) => {
    const { data } = await axios.get(
      `http://localhost:3000/apartments?page=${page}`
    );
    return data;
  };

  const { data, isLoading, isError, isFetching, isPreviousData } = useQuery({
    queryKey: ["apartmens", page],
    queryFn: () => fetchApartmens(page),
    keepPreviousData: true,
  });

  if (isError) {
    return <h1>Error</h1>;
  }

  return (
    <>
      <div className="container px-5 py-24 mx-auto">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 20 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.apartments.map((apartment: Apartment) => (
              <ApartmentCard
                key={apartment.id}
                title={apartment.title}
                imgsrc={apartment.imgsrc}
              />
            ))}
          </div>
        )}
        <div className="flex items-center justify-between mt-4">
          <button
            className={`py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${
              page === 1 && "opacity-50 cursor-not-allowed"
            }`}
            onClick={() => setPage((old) => Math.max(old - 1, 0))}
            disabled={page == 1}
          >
            Previous Page
          </button>
          <span className="text-gray-600">
            {isFetching ? "Loading..." : null}
          </span>
          <button
            className={`py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${
              isPreviousData || !data?.hasMore
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={() => {
              if (!isPreviousData && data.hasMore) {
                setPage((old) => old + 1);
              }
            }}
            disabled={isPreviousData || !data?.hasMore}
          >
            Next Page
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
