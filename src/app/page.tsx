'use client';

import { useEffect, useState } from 'react';
import { analytics, db } from '@/lib/firebase';
import { logEvent } from "firebase/analytics";
import { onChildAdded, ref } from 'firebase/database';

// import Sidebar from '@/components/sidebar';
import Dashboard from '@/components/dashboard';

type LogEntry = {
  value: string;
  timestamp: number;
};

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    if (analytics) {
      console.log('Firebase analytics initialized:', analytics);
      logEvent(analytics, 'homepage_visited');
    }

    const logsRef = ref(db, 'morse');

    // Listen to new entries in Realtime Database
    onChildAdded(logsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setLogs(prevLogs => [...prevLogs, data]);
      }
    });

  }, []);

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      <main className="flex-1 p-8">
        <Dashboard onMenuClick={() => setSidebarOpen(true)} />
        <div className="mt-6">
          {/* <h2 className="text-xl font-bold mb-4">Live Arduino Data</h2> */}
          <ul className="space-y-2">
            {logs.map((log, index) => (
              <li key={index} className="bg-white p-4 rounded shadow">
                <p className="text-sm">{log.value}</p>
                <p className="text-xs text-gray-500">
                  {new Date(log.timestamp).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
