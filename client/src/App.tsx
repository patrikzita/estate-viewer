import { useEffect, useState } from "react";
import axios from "axios";

type Apartment = {
  title: string
  imgSrc: string
  id: string
}

function App() {
  const [apartments, setApartments] = useState<Apartment[]>([]);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await axios.get("http://localhost:3000/apartments");
        setApartments(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchApartments();
  }, []);
  return (
    <>
      <h1>Hello client</h1>
      {apartments.map((apartment) => (
        <li key={apartment.id}>{apartment.title}</li>
      ))}
    </>
  );
}

export default App;
