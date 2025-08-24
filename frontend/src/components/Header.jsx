import { LogOut,Bell} from 'lucide-react';

// Header Component
const Header = () => {
    return (
        <header className="bg-white shadow-sm border-b px-6 py-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-800">Welcome, Admin</h2>
                <div className="flex items-center gap-4">
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                        <Bell size={20} />
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700">
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;