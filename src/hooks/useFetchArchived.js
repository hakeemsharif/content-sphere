import { useEffect, useState } from "react";

export default function useFetchArchived() {
  const [archived, setArchived] = useState(0);

  useEffect(() => {
    const fetchPublished = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/count/archived");
        const count = await response.json();
        setArchived(count);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };
    fetchPublished();
  }, []);

  return { archived };
}
