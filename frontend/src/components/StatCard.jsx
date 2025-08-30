

// Stat Card Component
const StatCard = ({ title, value, subtitle, color = 'blue', icon: Icon }) => {
    const colorClasses = {
        blue: 'border-l-blue-500',
        green: 'border-l-green-500',
        yellow: 'border-l-yellow-500',
        red: 'border-l-red-500'
    };

    return (
        <div className={`bg-white p-6 rounded-lg shadow-sm border-l-4 ${colorClasses[color]}`}>
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
                {Icon && <Icon size={24} className="text-gray-400" />}
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
            <div className="text-sm text-gray-500">{subtitle}</div>
        </div>
    );
};

export default StatCard;