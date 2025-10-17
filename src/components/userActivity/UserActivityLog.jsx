import React, { useEffect, useState } from 'react';
import { getUserActivityHistory } from '../../utils/userActivityTracker';
import { Activity, Clock, ShoppingCart, Eye, User, LogIn, LogOut } from 'lucide-react';

const UserActivityLog = ({ userId }) => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userId) {
            fetchActivities();
        }
    }, [userId]);

    const fetchActivities = async () => {
        setLoading(true);
        const data = await getUserActivityHistory(userId, 20);
        setActivities(data);
        setLoading(false);
    };

    const getActivityIcon = (type) => {
        switch (type) {
            case 'login':
                return <LogIn className="w-5 h-5 text-green-500" />;
            case 'logout':
                return <LogOut className="w-5 h-5 text-gray-500" />;
            case 'signup':
                return <User className="w-5 h-5 text-blue-500" />;
            case 'order_placed':
                return <ShoppingCart className="w-5 h-5 text-purple-500" />;
            case 'product_viewed':
                return <Eye className="w-5 h-5 text-orange-500" />;
            default:
                return <Activity className="w-5 h-5 text-gray-500" />;
        }
    };

    const getActivityColor = (type) => {
        switch (type) {
            case 'login':
                return 'bg-green-50 border-green-200';
            case 'logout':
                return 'bg-gray-50 border-gray-200';
            case 'signup':
                return 'bg-blue-50 border-blue-200';
            case 'order_placed':
                return 'bg-purple-50 border-purple-200';
            case 'product_viewed':
                return 'bg-orange-50 border-orange-200';
            default:
                return 'bg-gray-50 border-gray-200';
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 mb-6">
                <Activity className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-800">Activity Log</h2>
            </div>

            {activities.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    <Activity className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No activity recorded yet</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {activities.map((activity) => (
                        <div
                            key={activity.id}
                            className={`flex items-start gap-4 p-4 rounded-lg border ${getActivityColor(activity.activityType)}`}
                        >
                            <div className="flex-shrink-0 mt-1">
                                {getActivityIcon(activity.activityType)}
                            </div>
                            <div className="flex-grow">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-gray-800 capitalize">
                                        {activity.activityType.replace('_', ' ')}
                                    </h3>
                                    <div className="flex items-center gap-1 text-sm text-gray-500">
                                        <Clock className="w-4 h-4" />
                                        <span>{activity.date}</span>
                                    </div>
                                </div>
                                {activity.metadata && Object.keys(activity.metadata).length > 0 && (
                                    <div className="mt-2 text-sm text-gray-600">
                                        {Object.entries(activity.metadata).map(([key, value]) => (
                                            <div key={key}>
                                                <span className="font-medium">{key}:</span> {JSON.stringify(value)}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserActivityLog;
