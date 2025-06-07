// import { useState } from 'react';
// import { Fish, Bell, Settings, Calendar, BarChart3, Clock } from 'lucide-react';

// function Sidebar({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
//   const [activeItem, setActiveItem] = useState('Dashboard');

//   const menuItems = [
//     { name: 'Dashboard', icon: BarChart3 },
//     { name: 'Feeding Schedule', icon: Calendar },
//     { name: 'Alerts', icon: Bell },
//     { name: 'History', icon: Clock },
//     { name: 'Settings', icon: Settings },
//   ];

//   return (
//     <>
//       {/* Mobile Overlay */}
//       {isOpen && (
//         <div 
//         className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
//         onClick={onClose}
//         ></div>
//       )}
      
//       {/* Sidebar */}
//       <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-blue-900 to-blue-800 shadow-xl h-screen p-6 text-white transform transition-transform duration-300 ease-in-out ${
//         isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
//       }`}>
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-blue-700 rounded-lg">
//               <Fish className="w-8 h-8 text-blue-200" />
//             </div>
//             <div>
//               <h2 className="text-xl font-bold">AquaControl</h2>
//               <p className="text-blue-200 text-sm">Smart Aquarium System</p>
//             </div>
//           </div>
          
//           {/* Close button for mobile */}
//           <button
//             onClick={onClose}
//             className="lg:hidden p-2 hover:bg-blue-700 rounded-lg transition-colors"
//           >
//             <span className="sr-only">Close sidebar</span>
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>
        
//         <nav className="flex flex-col gap-2">
//           {menuItems.map((item) => {
//             const Icon = item.icon;
//             return (
//               <button
//                 key={item.name}
//                 onClick={() => {
//                   setActiveItem(item.name);
//                   onClose(); // Close sidebar on mobile after selection
//                 }}
//                 className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left w-full ${
//                   activeItem === item.name
//                     ? 'bg-blue-600 text-white shadow-lg transform scale-105'
//                     : 'text-blue-200 hover:bg-blue-700 hover:text-white'
//                 }`}
//               >
//                 <Icon className="w-5 h-5" />
//                 <span className="font-medium">{item.name}</span>
//               </button>
//             );
//           })}
//         </nav>
        
//         <div className="mt-8 p-4 bg-blue-800 rounded-xl border border-blue-600">
//           <div className="flex items-center gap-2 mb-2">
//             <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//             <span className="text-sm font-medium text-green-400">System Online</span>
//           </div>
//           <p className="text-xs text-blue-200">All sensors active</p>
//         </div>
//       </aside>
//     </>
//   );
// }

// export default Sidebar;