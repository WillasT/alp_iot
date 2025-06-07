import { FC, ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';


type MetricCardProps = {
    title: string;
    value: string | number;
    unit?: string;
    status?: 'Normal' | 'Warning' | 'Critical';
    icon: LucideIcon;
    color: string;
    gradient: string;
    action?: ReactNode;
};

const MetricCard: FC<MetricCardProps> = ({
    title,
    value,
    unit,
    status,
    icon: Icon,
    color,
    gradient,
    action
}) => {
    return (
        <div className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-white/40 hover:-translate-y-1">
        {/* Animated background gradient */}
        <div className={`absolute inset-0 ${gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}></div>
        
        <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
                <div className={`relative p-4 rounded-2xl ${color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white drop-shadow-sm" />
                    {/* Subtle glow effect */}
                    <div className={`absolute inset-0 ${color} rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
                </div>
                {status && (
                    <span className={`px-4 py-2 rounded-full text-xs font-semibold backdrop-blur-sm ${
                        status === 'Normal' ? 'bg-emerald-100/80 text-emerald-700 border border-emerald-200/50' :
                        status === 'Warning' ? 'bg-amber-100/80 text-amber-700 border border-amber-200/50' :
                        'bg-rose-100/80 text-rose-700 border border-rose-200/50'
                    } shadow-sm`}>
                        {status}
                    </span>
                )}
            </div>

            <h3 className="text-gray-600 font-semibold text-sm mb-2 tracking-wide uppercase">{title}</h3>
            <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold text-gray-800 tracking-tight">{value}</span>
                {unit && <span className="text-gray-500 text-sm font-medium">{unit}</span>}
            </div>

            {action}
        </div>
    </div>
    );
}

export default MetricCard;