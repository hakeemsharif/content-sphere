import { useEffect, useState } from "react";

export default function useFetchPublished() {
  const [published, setPublished] = useState(0);

  useEffect(() => {
    const fetchPublished = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/count/published");
        const count = await response.json();
        setPublished(count);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };
    fetchPublished();
  }, []);

  return { published };
}
