import { 
  LayoutDashboard, HandCoins, CreditCard, Building, 
  FileText, Users, BarChart, ChevronLeft, ChevronRight,
  LogOut
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar({ isOpen, toggleSidebar }) {
  // Get current location to highlight active route
  const location = useLocation();

  const mainNavItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
    { name: 'Add Customer', icon: <Users size={20} />, path: '/add-customer' },
    { name: 'Create Saving', icon: <HandCoins size={20} />, path: '/create-saving' },
    { name: 'Create RD', icon: <CreditCard size={20} />, path: '/create-rd' },
    { name: 'Create FD', icon: <Building size={20} />, path: '/create-fd' },
    { name: 'Apply for Loan', icon: <FileText size={20} />, path: '/apply-loan' },
    { name: 'Reports', icon: <BarChart size={20} />, path: '/reports' },
  ];

  return (
    <aside 
      className={`bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 flex flex-col border-r border-gray-200 dark:border-gray-700 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between h-20 px-4 border-b border-gray-200">
        {isOpen && (
          <div className="flex items-center">
            <img 
                src="/logo/logo-removebg-preview.png" 
                alt="Ojal micro Finance" 
                className="h-[115px] w-[220px] m-3"/>
          </div>
        )}
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-3">
          {mainNavItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center w-full p-2 rounded-lg ${
                  location.pathname === item.path
                    ? 'bg-gray-100 dark:bg-gray-700 text-teal-600 dark:text-teal-600'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span className="text-gray-500">{item.icon}</span>
                {isOpen && <span className="ml-3">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-gray-200">
        <button 
          className={`flex items-center p-2 rounded-lg hover:bg-gray-100 text-gray-700 w-full ${
            isOpen ? 'justify-start' : 'justify-center'
          }`}
        >
          <LogOut size={20} />
          {isOpen && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;