// src/components/MorseListener.tsx
import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { onChildAdded, ref } from 'firebase/database';

interface MorseEntry {
  value: string;
  timestamp: number;
}

export default function MorseListener() {
  const [data, setData] = useState<MorseEntry[]>([]);

  useEffect(() => {
    const morseRef = ref(db, 'morse');
    onChildAdded(morseRef, (snapshot) => {
      const newEntry = snapshot.val() as MorseEntry;
      setData(prev => [...prev, newEntry]);
    });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Live Morse Feed</h2>
      <ul className="bg-gray-100 p-2 rounded">
        {data.map((entry, index) => (
          <li key={index}>
            <strong>{new Date(entry.timestamp).toLocaleTimeString()}:</strong> {entry.value}
          </li>
        ))}
      </ul>
    </div>
  );
}
