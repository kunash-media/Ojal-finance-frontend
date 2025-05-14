import { Menu } from 'lucide-react';

function Navbar({ toggleSidebar }) {
  
  const navItems = [
    { name: 'Dashboard', id: 'dashboard' },
    { name: 'Savings', id: 'savings' },
    { name: 'RD', id: 'rd' },
    { name: 'FD', id: 'fd' },
    { name: 'Loan', id: 'loan' },
  ];

  return (
    <header className="z-10 py-4 bg-white shadow-sm">
      <div className="flex items-center justify-between px-4">
        {/* Left section: Menu button & nav items */}
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-full text-gray-600 lg:hidden"
          >
            <Menu size={20} />
          </button>
          
           {/* Desktop Navigation Menu */}
          <nav className="hidden ml-6 lg:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-gray-700 hover:text-blue-600 px-2 py-1"
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>

        {/* Right section: Search, notifications, profile */}
        <div className="flex items-center space-x-4">
          
          {/* Profile dropdown */}
          <div className="flex items-center">
            <div className="mr-2 flex flex-col items-end">
              <span className="font-medium text-sm">John Doe</span>
              <span className="text-xs text-gray-500">Admin</span>
            </div>
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-gray-300">
              <img src="/api/placeholder/40/40" alt="User profile" className="h-full w-full object-cover" />
            </div>
            {/* <button className="ml-1">
              <MoreHorizontal size={16} className="text-gray-600" />
            </button> */}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;