import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { Button } from "./style/button";
import { Input } from "./style/input";
import { Card, CardContent } from "./style/card";

import { Toaster, toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';

function LoginForm() {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); 

  const {login} = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear previous errors

    try {
      const response = await fetch(`http://localhost:8080/api/admins/login?username=${username}&password=${password}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {

        login(data); // Pass the user data to the context
        
        toast.success('Successfully Logged In!');
        setTimeout(() => navigate('/'), 1500);
        console.log("backend response :",data);
      } else {
        setError(data.message || 'Invalid username or password'); // Set error inline
        toast.error(data.message || 'Invalid username or password');
      }
    } catch (err) {
      setError('Failed to connect to server');
      toast.error('Failed to connect to server');
      console.log("submit error", err);
    } finally {
      setLoading(false);
    }
  };

  // Clear error when user changes inputs
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (error) setError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (error) setError('');
  };

  return (
    <div
  className="flex min-h-screen items-center justify-center p-4"
  style={{ background: 'linear-gradient(to bottom, rgba(5, 102, 94, 0.8), rgba(4, 78, 71, 0.95))' }}
>
  <Toaster position="top-right" richColors />
  <div className="flex w-half max-w-4xl flex-col items-center gap-8 rounded-2xl bg-white p-6 shadow-3xl md:flex-row">
    <div className="flex flex-col items-center gap-4">
      {/* Logo - adjust height class (h-24, h-32, h-40, etc.) as needed */}
      <div className=''>
        <img src="/logo/logo-removebg-preview.png" alt="Ojal-Micro Finance" className="h-40 w-auto object-contain"/>
      </div>
      {/* Illustration - adjust height class (h-48, h-56, h-64, h-72, etc.) as needed */}
      <div className="hidden w-full md:flex justify-center">
        <img
          src="src/assets/login.png"
          alt="Login Illustration"
          className="h-64 w-auto object-contain"
        />
      </div>
    </div>
    <Card className="border border-gray-300 bg-gray-50 w-full sm:w-11/12 md:w-4/5 lg:w-3/5 xxl:w-2/5 p-12 flex flex-col justify-center min-h-[480px] mx-auto">
      <CardContent className="space-y-9 p-4">
        <h2
          className="text-2xl font-bold text-center bg-gradient-to-r from-[#50B498] to-[#2E7D6D] bg-clip-text"
          style={{
            color: '#096B68',
            fontFamily: "'Nunito', sans-serif"
          }}
        >
          Admin Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="w-full lg:w-10/12 md:w-9/12 mx-auto">
            <Input
              type="text"
              placeholder="Username"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600 border-teal-600"
              value={username}
              onChange={handleUsernameChange}
              required
              disabled={loading}
            />
          </div>
          <div className="relative w-full lg:w-10/12 md:w-9/12 mx-auto">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600 border-teal-600"
              onChange={handlePasswordChange}
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {/* Inline error message */}
            {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
          </div>
          <div className="w-full lg:w-10/12 md:w-9/12 mx-auto">
            <Button
              type="submit"
              className="w-full  text-white  transition-colors duration-300"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </div>
        </form>
        <div className="text-center text-md ">
          Don't have an account?{' '}
          <button
            type="button"
            className="text-blue-800 hover:underline"
            onClick={() => navigate('/SignUp')}
          >
            Sign up
          </button>
        </div>
      </CardContent>
    </Card>
  </div>
</div>
  );
}
 export default LoginForm;
