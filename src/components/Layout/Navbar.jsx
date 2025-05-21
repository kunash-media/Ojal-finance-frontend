import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

function Navbar() {
  const location = useLocation();

  const {user} = useAuth();
  
  const navItems = [
    { name: 'Dashboard', id: 'dashboard', path: '/' },
    { name: 'Daily collection', id: 'savings', path: '/daily-collection' },
    { name: 'Recurring Deposit', id: 'rd', path: '/create-rd' },
    { name: 'Fixed Deposit', id: 'fd', path: '/create-fd' },
    { name: 'Loan', id: 'loan', path: '/apply-loan' },
  ];
  
  const getInitials = (name) => {
    const parts = name.split(' ');
    return parts.length >= 2
      ? `${parts[0][0]}${parts[parts.length-1][0]}`.toUpperCase()
      : name.substring(0, 2).toUpperCase();
  };

  const userName = user?.fullName || "NA";
  const branchName = user?.branchName || "NA";
  const userRole = user?.role || "NA";

  
  return (
    <nav className="bg-white shadow-sm p-3 border-b border-t-gray-300 flex justify-between items-center">
      {/* Left section: Menu button & nav items */}
      <div className="flex items-center space-x-4"> 
        
        {/* Desktop Navigation Menu */}
        <div className="hidden md:flex space-x-4">
          {navItems.map((item) => (
            <Link 
              key={item.id} 
              to={item.path}
              className={`px-3 py-2 rounded  hover:bg-gray-100  ${location.pathname === item.path ? 'text-teal-600 font-sm' : ''}`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
      
      {/* Right section: Search, notifications, profile */}
      <div className="flex items-center space-x-4">
        {/* Profile dropdown */}
        <div className="relative">
          <div className="flex items-center space-x-3">
            <div className="hidden md:block">
              <div className="font-medium">Name : {userName}</div>
              <div className="text-sm text-gray-500">Branch Name : <span className='text-gray-700 font-medium'>{branchName}</span></div>
              <div className="text-sm text-gray-500">Role :  <span className='text-teal-700 font-bold'>{userRole}</span></div>
            </div>
         
            <div className="w-10 h-10 rounded-full bg-teal-700 flex items-center justify-center text-white">
              {getInitials(userName)}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;