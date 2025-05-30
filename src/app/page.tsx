'use client';

import { useEffect, useState } from 'react';
import { analytics } from '@/lib/firebase';
import { logEvent } from "firebase/analytics";
import Sidebar from '@/components/sidebar';
import Dashboard from '@/components/dashboard';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (analytics) {
      console.log('Firebase analytics initialized:', analytics);
      logEvent(analytics, 'homepage_visited');
    }
  }, []);

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 p-8">
        <Dashboard onMenuClick={() => setSidebarOpen(true)}/>
      </main>
    </div>
  )
}

