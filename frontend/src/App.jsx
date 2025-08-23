import React, { useState, createContext, useContext } from 'react';
import {
    Users,
    Briefcase,
    DollarSign,
    BarChart3,
    Settings,
    Shield,
    Star,
    UserCheck,
    UserX,
    Clock,
    AlertTriangle,
    CheckCircle,
    Search,
    Filter,
    Calendar,
    Eye,
    Edit,
    Trash2,
    Plus,
    Download,
    RefreshCw,
    Home,
    LogOut,
    Bell
} from 'lucide-react';

// Global Context for app state
const AppContext = createContext();

// Mock Data
const mockData = {
    dashboard: {
        totalUsers: 2847,
        activeWorkers: 1234,
        completedJobs: 5621,
        totalRevenue: 847000
    },
    users: [
        { id: '#USR001', name: 'John Smith', email: 'john@email.com', type: 'Customer', status: 'ACTIVE', verification: 'VERIFIED', joinDate: '2024-01-15' },
        { id: '#USR002', name: 'Sarah Johnson', email: 'sarah@email.com', type: 'Worker', status: 'PENDING', verification: 'PENDING', joinDate: '2024-02-20' },
    ],
    workers: [
        { id: '#WRK001', name: 'Maria Garcia', skills: 'Cleaning, Organizing', rating: 4.9, jobsCompleted: 127, earnings: 12450, status: 'ACTIVE' },
        { id: '#WRK002', name: 'Peter Wilson', skills: 'Gardening, Landscaping', rating: 4.6, jobsCompleted: 89, earnings: 9870, status: 'ACTIVE' },
    ],
    jobs: [
        { id: '#JOB001', customer: 'John Smith', worker: 'Maria Garcia', service: 'House Cleaning', amount: 420.00, status: 'COMPLETED', date: '2024-08-22' },
        { id: '#JOB002', customer: 'Lisa Davis', worker: 'Peter Wilson', service: 'Garden Maintenance', amount: 680.00, status: 'IN PROGRESS', date: '2024-08-23' },
    ],
    reviews: [
        { reviewer: 'John Smith', reviewee: 'Maria Garcia', jobId: '#JOB001', rating: 5, comment: 'Excellent service! Maria was professional, thorough, and left my house spotless. Highly recommend!', date: '2024-08-22', status: 'PUBLISHED' },
        { reviewer: 'Lisa Davis', reviewee: 'Peter Wilson', jobId: '#JOB002', rating: 2, comment: 'Worker arrived late and didn\'t complete all requested tasks. Communication was poor.', date: '2024-08-20', status: 'UNDER REVIEW' },
    ],
    payments: [
        { id: '#TXN001', type: 'Job Payment', amount: 420.00, commission: 126.00, user: 'John Smith', status: 'COMPLETED', date: '2024-08-22' },
    ],
    safetyAlerts: [
        { type: 'Emergency Alert', message: 'Worker #WRK045 has triggered panic button during Job #JOB234', location: '123 Oak Street, Pretoria', status: 'Emergency Response' },
        { type: 'Safety Violation', message: 'Customer reported inappropriate behavior from Worker #WRK078', incident: '#INC001', status: 'Investigate' },
        { type: 'Background Check Complete', message: 'Worker #WRK089 cleared for platform access', status: 'Approve' },
    ]
};

// Router Component (Simple hash-based routing)
const Router = ({ children }) => {
    const [currentRoute, setCurrentRoute] = useState(window.location.hash.slice(1) || 'dashboard');

    React.useEffect(() => {
        const handleHashChange = () => {
            setCurrentRoute(window.location.hash.slice(1) || 'dashboard');
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    return (
        <AppContext.Provider value={{ currentRoute, setCurrentRoute, data: mockData }}>
            {children}
        </AppContext.Provider>
    );
};

// Navigation Component
const Navigation = () => {
    const { currentRoute } = useContext(AppContext);

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'users', label: 'User Management', icon: Users },
        { id: 'workers', label: 'Workers', icon: UserCheck },
        { id: 'jobs', label: 'Job Management', icon: Briefcase },
        { id: 'payments', label: 'Payments', icon: DollarSign },
        { id: 'reviews', label: 'Reviews', icon: Star },
        { id: 'reports', label: 'Reports', icon: BarChart3 },
        { id: 'safety', label: 'Safety Center', icon: Shield },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <nav className="bg-gradient-to-b from-blue-600 to-purple-700 text-white w-64 min-h-screen">
            <div className="p-6">
                <div className="flex items-center gap-3 mb-8">
                    <Shield className="text-2xl" />
                    <h1 className="text-xl font-bold">Sanctuary Admin</h1>
                </div>

                <div className="space-y-1">
                    {navItems.map(item => {
                        const Icon = item.icon;
                        return (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                    currentRoute === item.id
                                        ? 'bg-white bg-opacity-20 text-white'
                                        : 'text-blue-100 hover:bg-white hover:bg-opacity-10'
                                }`}
                            >
                                <Icon size={20} />
                                {item.label}
                            </a>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
};

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

// Dashboard Component
const Dashboard = () => {
    const { data } = useContext(AppContext);

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
                <p className="text-gray-600">Complete platform management system</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Total Users"
                    value="2,847"
                    subtitle="+12% from last month"
                    color="blue"
                    icon={Users}
                />
                <StatCard
                    title="Active Workers"
                    value="1,234"
                    subtitle="Currently available"
                    color="green"
                    icon={UserCheck}
                />
                <StatCard
                    title="Completed Jobs"
                    value="5,621"
                    subtitle="65% completion rate"
                    color="yellow"
                    icon={Briefcase}
                />
                <StatCard
                    title="Total Revenue"
                    value="R847k"
                    subtitle="Platform commission earned"
                    color="green"
                    icon={DollarSign}
                />
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between py-2">
                        <span>New worker registration: John Smith</span>
                        <span className="text-sm text-gray-500">2 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                        <span>Job completed: House Cleaning</span>
                        <span className="text-sm text-gray-500">3 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                        <span>Payment processed: R420</span>
                        <span className="text-sm text-gray-500">5 hours ago</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Users Management Component
const UsersManagement = () => {
    const { data } = useContext(AppContext);

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Users className="text-blue-500" />
                    User Management
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <StatCard title="Total Registered Users" value="2,847" subtitle="+12% from last month" color="blue" />
                    <StatCard title="Verified Users" value="2,435" subtitle="85.5% verification rate" color="green" />
                    <StatCard title="Pending Verification" value="312" subtitle="Requires attention" color="yellow" />
                    <StatCard title="Suspended Users" value="100" subtitle="Safety violations" color="red" />
                </div>

                <div className="flex gap-4 mb-6">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Search by name, email, or ID"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <select className="px-4 py-2 border border-gray-300 rounded-lg">
                        <option>All Status</option>
                        <option>Active</option>
                        <option>Pending</option>
                        <option>Suspended</option>
                    </select>
                    <select className="px-4 py-2 border border-gray-300 rounded-lg">
                        <option>All Types</option>
                        <option>Customer</option>
                        <option>Worker</option>
                    </select>
                    <input type="date" className="px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Verification</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Join Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {data.users.map(user => (
                        <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.type}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      user.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {user.status}
                  </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      user.verification === 'VERIFIED' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {user.verification}
                  </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.joinDate}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex gap-2">
                                    <button className="text-blue-600 hover:text-blue-900">View</button>
                                    <button className="text-green-600 hover:text-green-900">Edit</button>
                                    <button className="text-red-600 hover:text-red-900">Suspend</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Workers Management Component
const WorkersManagement = () => {
    const { data } = useContext(AppContext);

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <UserCheck className="text-blue-500" />
                    Workers Management
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <StatCard title="Active Workers" value="1,234" subtitle="Currently available" color="blue" />
                    <StatCard title="Verified Workers" value="1,089" subtitle="88% verification rate" color="green" />
                    <StatCard title="Pending Applications" value="145" subtitle="Awaiting review" color="yellow" />
                    <StatCard title="Top Rated Workers" value="456" subtitle="4.5+ star rating" color="green" />
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Worker Profile & Skills Management</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <input type="text" placeholder="Full name" className="px-4 py-2 border rounded-lg" />
                    <input type="email" placeholder="worker@email.com" className="px-4 py-2 border rounded-lg" />
                    <input type="tel" placeholder="+27 XX XXX XXXX" className="px-4 py-2 border rounded-lg" />
                    <input type="text" placeholder="Coverage area" className="px-4 py-2 border rounded-lg" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <select className="px-4 py-2 border rounded-lg">
                        <option>House Cleaning</option>
                        <option>Garden Maintenance</option>
                        <option>Plumbing</option>
                        <option>Electrical Work</option>
                        <option>Painting</option>
                    </select>
                    <input type="number" placeholder="150.00" className="px-4 py-2 border rounded-lg" />
                    <select className="px-4 py-2 border rounded-lg">
                        <option>Beginner (0-1 years)</option>
                        <option>Intermediate (2-5 years)</option>
                        <option>Expert (5+ years)</option>
                    </select>
                    <select className="px-4 py-2 border rounded-lg">
                        <option>Completed - Clear</option>
                        <option>Pending Review</option>
                        <option>Failed</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Worker ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Skills</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jobs Completed</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Earnings (Month)</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {data.workers.map(worker => (
                        <tr key={worker.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{worker.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{worker.name}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{worker.skills}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-1">
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={14} fill={i < Math.floor(worker.rating) ? 'currentColor' : 'none'} />
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-600">{worker.rating}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{worker.jobsCompleted}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">R{worker.earnings.toLocaleString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    {worker.status}
                  </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex gap-2">
                                    <button className="text-blue-600 hover:text-blue-900">Profile</button>
                                    <button className="text-green-600 hover:text-green-900">Edit</button>
                                    <button className="text-orange-600 hover:text-orange-900">Promote</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Job Management Component
const JobManagement = () => {
    const { data } = useContext(AppContext);

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Briefcase className="text-blue-500" />
                    Job Management
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <StatCard title="Total Jobs" value="8,642" subtitle="All time jobs posted" color="blue" />
                    <StatCard title="Completed Jobs" value="5,621" subtitle="65% completion rate" color="green" />
                    <StatCard title="Active Jobs" value="1,234" subtitle="Currently in progress" color="yellow" />
                    <StatCard title="Disputed Jobs" value="87" subtitle="Requires resolution" color="red" />
                </div>

                <div className="flex gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Search by job ID, customer, or worker..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <select className="px-4 py-2 border border-gray-300 rounded-lg">
                        <option>All Status</option>
                        <option>Completed</option>
                        <option>In Progress</option>
                        <option>Disputed</option>
                    </select>
                    <select className="px-4 py-2 border border-gray-300 rounded-lg">
                        <option>All Categories</option>
                        <option>House Cleaning</option>
                        <option>Garden Maintenance</option>
                    </select>
                    <input type="date" className="px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Job ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Worker</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {data.jobs.map(job => (
                        <tr key={job.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.customer}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.worker}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.service}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">R{job.amount.toFixed(2)}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      job.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {job.status}
                  </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex gap-2">
                                    <button className="text-blue-600 hover:text-blue-900">View Details</button>
                                    <button className="text-green-600 hover:text-green-900">Track</button>
                                    <button className="text-orange-600 hover:text-orange-900">Contact</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Reviews & Ratings Component
const ReviewsRatings = () => {
    const { data } = useContext(AppContext);

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Star className="text-blue-500" />
                    Reviews & Ratings Management
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <StatCard title="Total Reviews" value="12,456" subtitle="All platform reviews" color="blue" />
                    <StatCard title="Average Rating" value="4.7" subtitle="Platform-wide average" color="green" />
                    <StatCard title="Flagged Reviews" value="23" subtitle="Requires moderation" color="yellow" />
                    <StatCard title="Disputed Reviews" value="8" subtitle="Under investigation" color="red" />
                </div>

                <div className="flex gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Search by reviewer, worker, or content..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <select className="px-4 py-2 border border-gray-300 rounded-lg">
                        <option>All Ratings</option>
                        <option>5 Stars</option>
                        <option>4 Stars</option>
                        <option>3 Stars</option>
                        <option>2 Stars</option>
                        <option>1 Star</option>
                    </select>
                    <select className="px-4 py-2 border border-gray-300 rounded-lg">
                        <option>All Status</option>
                        <option>Published</option>
                        <option>Under Review</option>
                        <option>Flagged</option>
                    </select>
                    <input type="date" className="px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
            </div>

            <div className="space-y-4">
                {data.reviews.map((review, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm p-6 border">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="font-semibold text-gray-900">{review.reviewer} reviewed {review.reviewee}</h3>
                                <p className="text-sm text-gray-600">Job #{review.jobId} - House Cleaning • {review.date}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} fill={i < review.rating ? 'currentColor' : 'none'} />
                                    ))}
                                </div>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                    review.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                }`}>
                  {review.status}
                </span>
                            </div>
                        </div>

                        <div className="mb-4">
                            <p className="text-gray-700">{review.comment}</p>
                        </div>

                        <div className="flex gap-2">
                            <button className="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                                View Job
                            </button>
                            <button className="px-4 py-2 text-sm bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100">
                                Moderate
                            </button>
                            <button className="px-4 py-2 text-sm bg-green-50 text-green-600 rounded-lg hover:bg-green-100">
                                {review.status === 'PUBLISHED' ? 'Published' : 'Publish'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Payment Management Component
const PaymentManagement = () => {
    const { data } = useContext(AppContext);

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <DollarSign className="text-blue-500" />
                    Payment Management
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <StatCard title="Total Revenue" value="R847k" subtitle="Platform commission earned" color="blue" />
                    <StatCard title="Processed Payments" value="R2.8M" subtitle="Successfully processed" color="green" />
                    <StatCard title="Pending Payouts" value="R156k" subtitle="Awaiting processing" color="yellow" />
                    <StatCard title="Failed Transactions" value="23" subtitle="Requires attention" color="red" />
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Revenue Analytics</h3>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">📊 Revenue trends, payment volumes, and commission analytics would be displayed here</p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transaction ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Commission</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {data.payments.map(payment => (
                        <tr key={payment.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.type}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">R{payment.amount.toFixed(2)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">R{payment.commission.toFixed(2)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.user}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    {payment.status}
                  </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex gap-2">
                                    <button className="text-blue-600 hover:text-blue-900">View Receipt</button>
                                    <button className="text-orange-600 hover:text-orange-900">Refund</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Safety Center Component
const SafetyCenter = () => {
    const { data } = useContext(AppContext);

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Shield className="text-blue-500" />
                    Safety Center
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <StatCard title="High Priority Alerts" value="3" subtitle="Immediate attention required" color="red" />
                    <StatCard title="Medium Priority" value="12" subtitle="Review within 24 hours" color="yellow" />
                    <StatCard title="Background Checks" value="156" subtitle="Completed this month" color="blue" />
                    <StatCard title="Safety Score" value="98.7%" subtitle="Platform safety rating" color="green" />
                </div>
            </div>

            <div className="space-y-4 mb-6">
                {data.safetyAlerts.map((alert, index) => (
                    <div key={index} className={`p-4 rounded-lg border-l-4 ${
                        alert.type === 'Emergency Alert' ? 'bg-red-50 border-red-500' :
                            alert.type === 'Safety Violation' ? 'bg-yellow-50 border-yellow-500' :
                                'bg-green-50 border-green-500'
                    }`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <AlertTriangle size={20} className={
                                        alert.type === 'Emergency Alert' ? 'text-red-600' :
                                            alert.type === 'Safety Violation' ? 'text-yellow-600' :
                                                'text-green-600'
                                    } />
                                    <h3 className="font-semibold">{alert.type}:</h3>
                                </div>
                                <p className="text-gray-700 mb-2">{alert.message}</p>
                                {alert.location && <p className="text-sm text-gray-600">Location: {alert.location}</p>}
                                {alert.incident && <p className="text-sm text-gray-600">Incident Report {alert.incident} - Filed: 2024-08-22</p>}
                            </div>
                            <div className="flex gap-2">
                                {alert.type === 'Emergency Alert' && (
                                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                                        Emergency Response
                                    </button>
                                )}
                                {alert.type === 'Safety Violation' && (
                                    <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">
                                        Investigate
                                    </button>
                                )}
                                {alert.type === 'Background Check Complete' && (
                                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                                        Approve
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Safety Incident Reporting</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <select className="px-4 py-2 border border-gray-300 rounded-lg">
                        <option>Safety Violation</option>
                        <option>Emergency</option>
                        <option>Theft</option>
                        <option>Property Damage</option>
                    </select>
                    <select className="px-4 py-2 border border-gray-300 rounded-lg">
                        <option>High - Immediate</option>
                        <option>Medium - 24 hours</option>
                        <option>Low - Review</option>
                    </select>
                    <input type="text" placeholder="User ID or name" className="px-4 py-2 border border-gray-300 rounded-lg" />
                    <input type="text" placeholder="Job ID (if applicable)" className="px-4 py-2 border border-gray-300 rounded-lg" />
                </div>

                <textarea
                    placeholder="Detailed description of the incident..."
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500"
                />

                <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    Create Incident Report
                </button>
            </div>
        </div>
    );
};

// Reports & Analytics Component
const ReportsAnalytics = () => {
    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <BarChart3 className="text-blue-500" />
                    Reports & Analytics
                </h1>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Generate Custom Report</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                            <option>User Activity Report</option>
                            <option>Revenue Report</option>
                            <option>Job Performance Report</option>
                            <option>Safety Report</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                        <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
                        <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                            <option>PDF Report</option>
                            <option>Excel</option>
                            <option>CSV</option>
                        </select>
                    </div>
                </div>

                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Generate Report
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-4">User Growth Trends</h3>
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                        <p className="text-gray-500">📈 User registration and activity growth charts</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-4">Revenue Analytics</h3>
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                        <p className="text-gray-500">💰 Revenue trends and payment volume analysis</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-4">Job Categories Performance</h3>
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                        <p className="text-gray-500">🔧 Service category popularity and success rates</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-4">Geographic Heat Map</h3>
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                        <p className="text-gray-500">🗺️ Service demand and user distribution by location</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Customer Focus Component
const CustomerFocus = () => {
    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Users className="text-blue-500" />
                    Users (Customer Focus)
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <StatCard title="Active Customers" value="1,834" subtitle="Monthly active users" color="blue" />
                    <StatCard title="Customer Retention" value="78%" subtitle="Return customer rate" color="green" />
                    <StatCard title="Avg. Spending" value="R1,240" subtitle="Per customer per month" color="yellow" />
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Customer Profile Management</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <input type="text" placeholder="Full name" className="px-4 py-2 border border-gray-300 rounded-lg" />
                    <input type="email" placeholder="email@example.com" className="px-4 py-2 border border-gray-300 rounded-lg" />
                    <input type="tel" placeholder="+27 XX XXX XXXX" className="px-4 py-2 border border-gray-300 rounded-lg" />
                    <input type="text" placeholder="City, Province" className="px-4 py-2 border border-gray-300 rounded-lg" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <select className="px-4 py-2 border border-gray-300 rounded-lg">
                        <option>Active</option>
                        <option>Inactive</option>
                        <option>Suspended</option>
                    </select>
                    <select className="px-4 py-2 border border-gray-300 rounded-lg">
                        <option>Fully Verified</option>
                        <option>Partially Verified</option>
                        <option>Unverified</option>
                    </select>
                    <input type="number" step="0.01" placeholder="0.00" className="px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
            </div>
        </div>
    );
};

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

// Main App Component
const App = () => {
    const { currentRoute } = useContext(AppContext);

    const renderPage = () => {
        switch(currentRoute) {
            case 'dashboard': return <Dashboard />;
            case 'users': return <UsersManagement />;
            case 'workers': return <WorkersManagement />;
            case 'jobs': return <JobManagement />;
            case 'payments': return <PaymentManagement />;
            case 'reviews': return <ReviewsRatings />;
            case 'reports': return <ReportsAnalytics />;
            case 'safety': return <SafetyCenter />;
            case 'settings': return <SettingsComponent />;
            case 'customers': return <CustomerFocus />;
            default: return <Dashboard />;
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Navigation />
            <div className="flex-1">
                <Header />
                <main>
                    {renderPage()}
                </main>
            </div>
        </div>
    );
};

// Root Component with Router
export default function SanctuaryAdminCMS() {
    return (
        <Router>
            <App />
        </Router>
    );
}