import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ApartmentCard from "./components/ApartmentCard";
import SkeletonCard from "./components/SkeletonCard";
import Error from "./components/Error";
import { Button } from "./components/ui/button";
import Loader from "./components/Loader";
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import Navbar from "./components/Navbar";

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
    return <Error />;
  }

  return (
    <>
      <Navbar />
      <div className="container px-5 py-24 mx-auto">
        {isFetching ? <Loader /> : null}
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
        <div className="flex items-center justify-center mt-4 gap-4">
          {page != 1 && (
            <Button
              onClick={() => {
                setPage((old) => Math.max(old - 1, 0));
                window.scrollTo(0, 0);
              }}
              disabled={page == 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
          <Button
            onClick={() => {
              if (!isPreviousData && data.hasMore) {
                setPage((old) => old + 1);
                window.scrollTo(0, 0);
              }
            }}
            disabled={isPreviousData || !data?.hasMore}
          >
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
}

export default App;
