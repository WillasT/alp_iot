import { useState, useEffect } from 'react';
import { Fish, Droplets, Sun, Thermometer, Bell, Waves } from 'lucide-react';
import { db } from '@/lib/firebase';
import { ref, onValue, set } from 'firebase/database';
import MetricCard from '@/components/metriccard';

// Function to update manual control settings in Firebase
function updateManualControl(type: 'light' | 'feed' | 'water', isMode: boolean, value: boolean, callback?: () => void) {
    const path = isMode ? `manualControl/mode/${type}` : `manualControl/trigger/${type}`;
    set(ref(db, path), value).then(() => {
        if (callback) callback(); // Update state only after successful write
    });
}


function Dashboard({ onMenuClick }: { onMenuClick: () => void }) {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [waterLevel, setWaterLevel] = useState(75);
    const [lightIntensity, setLightIntensity] = useState(80);
    const [temperature, setTemperature] = useState(28);
    const [manualMode, setManualMode] = useState({
        light: false,
        feed: false,
        water: false
    });

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);

        // Fetch data from Firebase
        const dataRef = ref(db, 'sensorData');
        const unsubscribe = onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                if (data.waterLevel !== undefined) setWaterLevel(data.waterLevel);
                if (data.lightIntensity !== undefined) setLightIntensity(data.lightIntensity);
                if (data.temperature !== undefined) setTemperature(data.temperature);
                // Add more mappings as needed
            }
        });

        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        const modeRef = ref(db, 'manualControl/mode');
        const unsubscribe = onValue(modeRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setManualMode({
                    light: !!data.light,
                    feed: !!data.feed,
                    water: !!data.water
                });
            }
        });
    
        return () => unsubscribe();
    }, []);
    

    const nextFeeding = new Date();
    nextFeeding.setHours(12, 0, 0, 0);
    if (nextFeeding < currentTime) {
        nextFeeding.setDate(nextFeeding.getDate() + 1);
    }

    const timeUntilFeeding = Math.ceil((nextFeeding.getTime() - currentTime.getTime()) / (1000 * 60));

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/50">
            {/* Animated background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
            </div>

            <div className="relative z-10 space-y-8 p-6 sm:p-8">
                {/* Enhanced Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onMenuClick}
                            className="lg:hidden p-3 hover:bg-white/50 rounded-2xl transition-all duration-300 backdrop-blur-sm border border-white/20"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>

                        <div>
                            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent mb-2">
                                Aquarium Control
                            </h1>
                            <p className="text-gray-600 text-lg font-medium">Monitor your underwater ecosystem</p>
                        </div>
                    </div>

                    <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-white/30 shadow-lg">
                        <p className="text-sm text-gray-500 font-medium mb-1">Current Time</p>
                        <p className="text-2xl font-bold text-gray-800 font-mono tracking-tight">
                            {currentTime.toLocaleTimeString()}
                        </p>
                    </div>
                </div>

                {/* Enhanced Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                    <MetricCard
                        title="Auto Fish Feeder"
                        value={timeUntilFeeding}
                        unit="min until next feeding"
                        icon={Fish}
                        color="bg-gradient-to-br from-blue-500 to-blue-600"
                        gradient="bg-gradient-to-br from-blue-500 to-blue-600"
                        action={
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className={`w-3 h-3 rounded-full ${manualMode.feed ? 'bg-rose-400' : 'bg-emerald-400'} shadow-sm`}></div>
                                    <p className="font-semibold text-gray-700 text-sm">
                                        Mode: <span className={`font-bold ${manualMode.feed ? 'text-rose-600' : 'text-emerald-600'}`}>
                                            {manualMode.feed ? 'Manual' : 'Auto'}
                                        </span>
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => updateManualControl('feed', true, !manualMode.feed, () => {
                                            setManualMode((prev) => ({ ...prev, feed: !prev.feed }));
                                        })}
                                        className="flex-1 bg-gradient-to-r from-gray-700 to-gray-800 text-white px-4 py-2.5 rounded-xl hover:from-gray-800 hover:to-gray-900 transition-all duration-300 font-medium text-sm shadow-lg hover:shadow-xl"
                                    >
                                        Toggle Mode
                                    </button>
                                    {manualMode.feed && (
                                        <button
                                            onClick={() => updateManualControl('feed', false, true)}
                                            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2.5 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-medium text-sm shadow-lg hover:shadow-xl"
                                        >
                                            Feed Now
                                        </button>
                                    )}
                                </div>
                            </div>
                        }
                    />

                    <MetricCard
                        title="Water Level"
                        value={waterLevel}
                        unit="%"
                        status="Normal"
                        icon={Droplets}
                        color="bg-gradient-to-br from-cyan-500 to-cyan-600"
                        gradient="bg-gradient-to-br from-cyan-500 to-cyan-600"
                        action={
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className={`w-3 h-3 rounded-full ${manualMode.water ? 'bg-rose-400' : 'bg-emerald-400'} shadow-sm`}></div>
                                    <p className="font-semibold text-gray-700 text-sm">
                                        Mode: <span className={`font-bold ${manualMode.water ? 'text-rose-600' : 'text-emerald-600'}`}>
                                            {manualMode.water ? 'Manual' : 'Auto'}
                                        </span>
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => updateManualControl('water', true, !manualMode.water, () => {
                                            setManualMode((prev) => ({ ...prev, water: !prev.water }));
                                        })}
                                        className="flex-1 bg-gradient-to-r from-gray-700 to-gray-800 text-white px-4 py-2.5 rounded-xl hover:from-gray-800 hover:to-gray-900 transition-all duration-300 font-medium text-sm shadow-lg hover:shadow-xl"
                                    >
                                        Toggle Mode
                                    </button>
                                    {manualMode.water && (
                                        <button
                                            onClick={() => updateManualControl('water', false, true)}
                                            className="flex-1 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-4 py-2.5 rounded-xl hover:from-cyan-600 hover:to-cyan-700 transition-all duration-300 font-medium text-sm shadow-lg hover:shadow-xl"
                                        >
                                            Fill Water
                                        </button>
                                    )}
                                </div>
                            </div>
                        }
                    />

                    <MetricCard
                        title="Temperature"
                        value={temperature}
                        unit="°C"
                        status={temperature > 34 ? "Warning" : "Normal"}
                        icon={Thermometer}
                        color="bg-gradient-to-br from-rose-500 to-rose-600"
                        gradient="bg-gradient-to-br from-rose-500 to-rose-600"
                        action={
                            <div className="flex items-center gap-3">
                                <div className={`w-4 h-4 rounded-full ${temperature > 34 ? 'bg-amber-400' : 'bg-emerald-400'} shadow-sm animate-pulse`}></div>
                                <span className="text-sm font-medium text-gray-600">
                                    {temperature > 34 ? "Too hot! Check heater" : "Perfect temperature"}
                                </span>
                            </div>
                        }
                    />

                    <MetricCard
                        title="Lighting System"
                        value={lightIntensity}
                        unit="% intensity"
                        icon={Sun}
                        color="bg-gradient-to-br from-amber-500 to-yellow-500"
                        gradient="bg-gradient-to-br from-amber-500 to-yellow-500"
                        action={
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className={`w-3 h-3 rounded-full ${manualMode.light ? 'bg-rose-400' : 'bg-emerald-400'} shadow-sm`}></div>
                                    <p className="font-semibold text-gray-700 text-sm">
                                        Mode: <span className={`font-bold ${manualMode.light ? 'text-rose-600' : 'text-emerald-600'}`}>
                                            {manualMode.light ? 'Manual' : 'Auto'}
                                        </span>
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => updateManualControl('light', true, !manualMode.light, () => {
                                            setManualMode((prev) => ({ ...prev, light: !prev.light }));
                                        })}
                                        className="flex-1 bg-gradient-to-r from-gray-700 to-gray-800 text-white px-4 py-2.5 rounded-xl hover:from-gray-800 hover:to-gray-900 transition-all duration-300 font-medium text-sm shadow-lg hover:shadow-xl"
                                    >
                                        Toggle Mode
                                    </button>
                                    {manualMode.light && (
                                        <button
                                            onClick={() => updateManualControl('light', false, true)}
                                            className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-4 py-2.5 rounded-xl hover:from-amber-600 hover:to-yellow-600 transition-all duration-300 font-medium text-sm shadow-lg hover:shadow-xl"
                                        >
                                            Toggle Light
                                        </button>
                                    )}
                                </div>
                            </div>
                        }
                    />
                </div>

                {/* Enhanced Activity Panel */}
                <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
                            <Bell className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800">System Activity</h3>
                            <p className="text-gray-600 font-medium">Real-time monitoring updates</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {[
                            { icon: '⚠️', text: 'Food level running low - refill recommended', time: '5 min ago', type: 'warning', bg: 'bg-amber-50', border: 'border-amber-200' },
                            { icon: '💧', text: 'Water refilled automatically to optimal level', time: '2 hours ago', type: 'success', bg: 'bg-emerald-50', border: 'border-emerald-200' },
                            { icon: '☀️', text: 'Lighting adjusted to 80% for optimal growth', time: '3 hours ago', type: 'info', bg: 'bg-blue-50', border: 'border-blue-200' },
                            { icon: '🌡️', text: 'Temperature stable at perfect 28°C range', time: '4 hours ago', type: 'success', bg: 'bg-emerald-50', border: 'border-emerald-200' },
                        ].map((notification, index) => (
                            <div key={index} className={`flex items-center gap-4 p-5 rounded-2xl hover:shadow-md transition-all duration-300 border ${notification.bg} ${notification.border}`}>
                                <div className="text-2xl flex-shrink-0">{notification.icon}</div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-gray-800 font-medium mb-1">{notification.text}</p>
                                    <p className="text-sm text-gray-500 font-medium">{notification.time}</p>
                                </div>
                                <div className={`w-3 h-3 rounded-full flex-shrink-0 shadow-sm ${
                                    notification.type === 'warning' ? 'bg-amber-400' :
                                    notification.type === 'success' ? 'bg-emerald-400' :
                                    'bg-blue-400'
                                }`}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Dashboard;