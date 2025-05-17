import { useState, useEffect, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function CreateSaving() {

  // State for user data
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for search functionality
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('name');

  // State for modal and form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [savingData, setSavingData] = useState({
    interestRate: "",
    minimumBalance: "",
    initialDeposit: ""
  });

  useEffect(() => {
    // Simulated fetch - replace with actual API call
    setTimeout(() => {
      const mockUsers = [
        { id: 'U55588', name: 'John Doe', mobile: '9876543210', address: '123 Main St, City', email: 'john@example.com', date: '2023-10-15' },
        { id: 'U55589', name: 'Jane Smith', mobile: '8765432109', address: '456 Park Ave, Town', email: 'jane@example.com', date: '2023-11-20' },
        { id: 'U55590', name: 'Michael Johnson', mobile: '7654321098', address: '789 Oak Rd, Village', email: 'michael@example.com', date: '2023-12-05' },
        { id: 'U55591', name: 'Sarah Williams', mobile: '6543210987', address: '101 Pine St, County', email: 'sarah@example.com', date: '2024-01-10' },
      ];
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, []);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((term, type) => {
      if (!term.trim()) {
        setFilteredUsers(users);
        return;
      }

      const filtered = users.filter(user => {
        const value = user[type].toLowerCase();
        return value.includes(term.toLowerCase());
      });
      
      setFilteredUsers(filtered);
    }, 500),
    [users]
  );

  // Handle search input change
  useEffect(() => {
    debouncedSearch(searchTerm, searchType);
  }, [searchTerm, searchType, debouncedSearch]);

  // Handle saving account form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSavingData({
      ...savingData,
      [name]: parseFloat(value)
    });
  };

  // Open modal for adding saving account
  const handleAddSaving = (userId) => {
    setCurrentUserId(userId);
    setIsModalOpen(true);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    setIsConfirmModalOpen(true);
  };

  // Handle confirmation and API call
  const handleConfirm = async () => {
    try {
      // Construct the API endpoint URL with user ID
      const apiUrl = `http://localhost:8080/api/accounts/${currentUserId}/saving`;
      
      // Prepare the payload
      const payload = {
        interestRate: savingData.interestRate,
        minimumBalance: savingData.minimumBalance,
        initialDeposit: savingData.initialDeposit
      };

      // API call (commented out for now)
      /*
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to create saving account');
      }

      const data = await response.json();
      */

      // Simulating successful API call
      console.log('API call would be made to:', apiUrl);
      console.log('With payload:', payload);
      
      // Close confirmation modal
      setIsConfirmModalOpen(false);
      
      // Show success notification
      toast.success('Saving account created successfully!');
      
      // Reset form data
      setSavingData({
        interestRate: "",
        minimumBalance: "",
        initialDeposit: ""
      });
      
    } catch (error) {
      // Close confirmation modal
      setIsConfirmModalOpen(false);
      
      // Show error notification
      toast.error('Failed to create saving account: ' + error.message);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg  border border-gray-300 shadow-sm"
         style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #E1F7F5 40%, #ffffff 100%)',
          }}>
            
      {/* App description section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Create Saving Account</h1>
        <p className="text-gray-600">
          Create and manage savings accounts for customers. Our savings accounts offer competitive interest rates
          and flexible terms to help customers grow their wealth securely.
        </p>
      </div>

      {/* Search section */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="flex-1 min-w-[280px]">
          <input
            type="text"
            placeholder={`Search by ${searchType}...`}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600 border-teal-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-48">
          <select
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600 border-teal-600"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="name">Search by Name</option>
            <option value="mobile">Search by Mobile</option>
          </select>
        </div>
      </div>

      {/* Users table */}
      <div className="overflow-x-auto overflow-y-auto h-[300px]">
        <table className="min-w-full bg-white border border-gray-300 rounded-md">
          <thead className='sticky top-0'>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 border-b text-left">Id</th>
              <th className="py-3 px-4 border-b text-left">Name</th>
              <th className="py-3 px-4 border-b text-left">Mobile</th>
              <th className="py-3 px-4 border-b text-left">Address</th>
              <th className="py-3 px-4 border-b text-left">Email</th>
              <th className="py-3 px-4 border-b text-left">Date</th>
              <th className="py-3 px-4 border-b text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="py-4 px-4 text-center">Loading...</td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-4 px-4 text-center">No users found</td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="py-3 px-3 border-b">{user.id}</td>
                  <td className="py-3 px-3 border-b">{user.name}</td>
                  <td className="py-3 px-3 border-b">{user.mobile}</td>
                  <td className="py-3 px-3 border-b">{user.address}</td>
                  <td className="py-3 px-3 border-b">{user.email}</td>
                  <td className="py-3 px-3 border-b">{user.date}</td>
                  <td className="py-3 px-3 border-b text-center">
                    <button
                      className="bg-teal-600 text-white px-3 py-1 rounded hover:bg-teal-700 transition-colors"
                      onClick={() => handleAddSaving(user.id)}
                    >
                      Add Saving
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for adding saving account */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create Savings Account</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Interest Rate (%)</label>
                <input
                  type="number"
                  name="interestRate"
                  step="0.1"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600 border-teal-600"
                  value={savingData.interestRate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Minimum Balance (₹)</label>
                <input
                  type="number"
                  name="minimumBalance"
                  step="100"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600 border-teal-600"
                  value={savingData.minimumBalance}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Initial Deposit (₹)</label>
                <input
                  type="number"
                  name="initialDeposit"
                  step="100"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600 border-teal-600"
                  value={savingData.initialDeposit}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation modal */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Confirm Savings Account Creation</h2>
            <p className="mb-6 text-gray-600">
              Are you sure you want to create a savings account with the following details?
            </p>
            <div className="mb-4 bg-gray-100 border border-gray-200 p-3 rounded">
              <p className="mb-2"><span className="font-semibold">Interest Rate:</span> {savingData.interestRate}%</p>
              <p className="mb-2"><span className="font-semibold">Minimum Balance:</span> ₹{savingData.minimumBalance.toFixed(2)}</p>
              <p><span className="font-semibold">Initial Deposit:</span> ₹{savingData.initialDeposit.toFixed(2)}</p>
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                onClick={() => setIsConfirmModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
                onClick={handleConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast notifications container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

// Debounce helper function
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

export default CreateSaving;