import { useEffect, useState } from "react";

export default function useFetchPending() {
  const [pending, setPending] = useState(0);

  useEffect(() => {
    const fetchPublished = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/count/pending");
        const count = await response.json();
        setPending(count);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };
    fetchPublished();
  }, []);

  return { pending };
}
