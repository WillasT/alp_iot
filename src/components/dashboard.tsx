import { useState, useEffect } from 'react';
import { Fish, Droplets, Sun, Thermometer, Bell, Waves } from 'lucide-react';
import MetricCard from '@/components/metriccard';

function Dashboard({onMenuClick}: { onMenuClick: () => void }) {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [waterLevel, setWaterLevel] = useState(75);
    const [lightIntensity, setLightIntensity] = useState(80);
    const [autoRefill, setAutoRefill] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const nextFeeding = new Date();
    nextFeeding.setHours(12, 0, 0, 0);
    if (nextFeeding < currentTime) {
        nextFeeding.setDate(nextFeeding.getDate() + 1);
    }

    const timeUntilFeeding = Math.ceil((nextFeeding.getTime() - currentTime.getTime()) / (1000 * 60));

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    {/* Mobile menu button */}
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Dashboard</h1>
                        <p className="text-gray-600 mt-1 text-sm sm:text-base">Monitor your aquarium in real-time</p>
                    </div>
                </div>

                <div className="text-left sm:text-right">
                    <p className="text-sm text-gray-500">Current Time</p>
                    <p className="text-lg sm:text-xl font-semibold text-gray-800">
                        {currentTime.toLocaleTimeString()}
                    </p>
                </div>
            </div>

            {/* Main Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
                <MetricCard
                    title="Auto Fish Feeder"
                    value={timeUntilFeeding}
                    unit="min until next feeding"
                    icon={Fish}
                    color="bg-blue-500"
                    action={
                        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-xl transition-colors duration-200 text-sm sm:text-base">
                            Feed Now
                        </button>
                    }
                />

                <MetricCard
                    title="Water Level"
                    value={waterLevel}
                    unit="%"
                    status="Normal"
                    icon={Droplets}
                    color="bg-cyan-500"
                    action={
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-cyan-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${waterLevel}%` }}
                            ></div>
                        </div>
                    }
                />

                <MetricCard
                    title="Temperature"
                    value="28"
                    unit="°C"
                    status="Normal"
                    icon={Thermometer}
                    color="bg-red-500"
                    action={
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            Optimal range
                        </div>
                    }
                />

                <MetricCard
                    title="Lighting"
                    value={lightIntensity}
                    unit="% intensity"
                    icon={Sun}
                    color="bg-yellow-500"
                    action={
                        <div className="space-y-2">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${lightIntensity}%` }}
                                ></div>
                            </div>
                            <label className="flex items-center gap-2 text-xs sm:text-sm">
                                <input
                                    type="checkbox"
                                    checked={autoRefill}
                                    onChange={(e) => setAutoRefill(e.target.checked)}
                                    className="accent-blue-500"
                                />
                                <span className="text-gray-600">Auto Schedule</span>
                            </label>
                        </div>
                    }
                />
            </div>

            {/* Notifications Panel */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800">Recent Activity</h3>
                </div>

                <div className="space-y-3">
                    {[
                        { icon: '⚠️', text: 'Food level running low', time: '5 min ago', type: 'warning' },
                        { icon: '💧', text: 'Water refilled automatically', time: '2 hours ago', type: 'success' },
                        { icon: '☀️', text: 'Lighting adjusted to 80%', time: '3 hours ago', type: 'info' },
                        { icon: '🌡️', text: 'Temperature stable at 28°C', time: '4 hours ago', type: 'success' },
                    ].map((notification, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                            <span className="text-lg sm:text-xl">{notification.icon}</span>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-800 truncate sm:whitespace-normal">{notification.text}</p>
                                <p className="text-xs text-gray-500">{notification.time}</p>
                            </div>
                            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${notification.type === 'warning' ? 'bg-yellow-400' :
                                    notification.type === 'success' ? 'bg-green-400' :
                                        'bg-blue-400'
                                }`}></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg flex flex-col items-center justify-center">
                    <Fish className="w-6 h-6 mb-2" />
                    <span className="font-medium text-sm sm:text-base">Manual Feed</span>
                </button>

                <button className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white p-4 rounded-xl hover:from-cyan-600 hover:to-cyan-700 transition-all duration-200 shadow-lg flex flex-col items-center justify-center">
                    <Waves className="w-6 h-6 mb-2" />
                    <span className="font-medium text-sm sm:text-base">Water Change</span>
                </button>

                <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-4 rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200 shadow-lg flex flex-col items-center justify-center sm:col-span-2 lg:col-span-1">
                    <Sun className="w-6 h-6 mb-2" />
                    <span className="font-medium text-sm sm:text-base">Light Control</span>
                </button>
            </div>
        </div>

    );
}

export default Dashboard;