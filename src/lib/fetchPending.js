// lib/fetchPending.ts
export async function fetchPendingCount() {
    const res = await fetch('http://localhost:3000/api/count/pending', {
      cache: 'no-store',
    });
    const count = await res.json();
    return count;
  }
  