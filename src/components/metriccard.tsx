import { FC, ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';


type MetricCardProps = {
    title: string;
    value: string | number;
    unit?: string;
    status?: 'Normal' | 'Warning' | 'Critical';
    icon: LucideIcon;
    color: string;
    action?: ReactNode;
};

const MetricCard: FC<MetricCardProps> = ({
    title,
    value,
    unit,
    status,
    icon: Icon,
    color,
    action
}) => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${color}`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
                {status && (
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${status === 'Normal' ? 'bg-green-100 text-green-700' :
                        status === 'Warning' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                        }`}>
                        {status}
                    </span>
                )}
            </div>

            <h3 className="text-gray-600 font-medium text-sm mb-1">{title}</h3>
            <div className="flex items-baseline gap-1 mb-3">
                <span className="text-2xl font-bold text-gray-800">{value}</span>
                {unit && <span className="text-gray-500 text-sm">{unit}</span>}
            </div>

            {action}
        </div>
    );
}

export default MetricCard;