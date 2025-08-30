import {Settings,Shield,Clock,Bell,DollarSign} from 'lucide-react';



// Settings Component
const SettingsComponent = () => {
    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Settings className="text-blue-500" />
                    Platform Settings
                </h1>
            </div>

            <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <DollarSign className="text-orange-500" size={20} />
                        <h3 className="text-lg font-semibold">Financial Configuration</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Platform Commission Rate (%)</label>
                            <input type="number" defaultValue="30" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                            <p className="text-xs text-gray-500 mt-1">Current 30% commission on completed jobs</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Processing Fee</label>
                            <input type="number" defaultValue="2.9" step="0.1" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                            <p className="text-xs text-gray-500 mt-1">Percentage fee for payment processing</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Job Value</label>
                            <input type="number" defaultValue="50" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                            <p className="text-xs text-gray-500 mt-1">Minimum amount for job posting (ZAR)</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Shield className="text-blue-500" size={20} />
                        <h3 className="text-lg font-semibold">Security & Verification Settings</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Background Check Requirement</label>
                            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                                <option>Mandatory for all workers</option>
                                <option>Optional</option>
                                <option>Required for high-value jobs</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">ID Verification Method</label>
                            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                                <option>Government ID + Selfie</option>
                                <option>Government ID only</option>
                                <option>Biometric verification</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">GPS Tracking</label>
                            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                                <option>Always enabled during jobs</option>
                                <option>Optional for workers</option>
                                <option>Disabled</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Bell className="text-green-500" size={20} />
                        <h3 className="text-lg font-semibold">Communication Settings</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Notifications</label>
                            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                                <option>All notifications enabled</option>
                                <option>Critical only</option>
                                <option>Disabled</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">SMS Notifications</label>
                            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                                <option>Emergency only</option>
                                <option>All notifications</option>
                                <option>Disabled</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">In-App Messaging</label>
                            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                                <option>Enabled with moderation</option>
                                <option>Fully enabled</option>
                                <option>Disabled</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Clock className="text-red-500" size={20} />
                        <h3 className="text-lg font-semibold">Operational Hours</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Platform Operating Hours</label>
                            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                                <option>24/7 Operations</option>
                                <option>Business hours only</option>
                                <option>Custom schedule</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Customer Support Hours</label>
                            <input type="text" defaultValue="08:00" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                            <p className="text-xs text-gray-500 mt-1">to</p>
                            <input type="text" defaultValue="18:00" className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-1" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Response</label>
                            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                                <option>24/7 Emergency line</option>
                                <option>Business hours only</option>
                                <option>Automated response</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Save All Settings
                    </button>
                    <button className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                        Reset to Defaults
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsComponent;