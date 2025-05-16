import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [error, setError] = useState(''); // New error state

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear previous errors

    try {
      const response = await fetch('https://your-backend-api.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Successfully Logged In!');
        setTimeout(() => navigate('/dashboard'), 1500);
      } else {
        setError(data.message || 'Invalid username or password'); // Set error inline
        toast.error(data.message || 'Invalid username or password');
      }
    } catch (err) {
      setError('Failed to connect to server');
      toast.error('Failed to connect to server');
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
      style={{ background: 'linear-gradient(to bottom, rgba(80, 180, 152, 0.1), rgba(80, 180, 152, 0.4))' }}
    >
      <Toaster position="top-right" richColors />

      <div className="flex w-full max-w-6xl flex-col items-center gap-8 rounded-2xl bg-white p-6 shadow-3xl md:flex-row">

        <div className="hidden w-full md:flex md:w-1/2 justify-center">
          <img
            src="src/assets/login.png"
            alt="Login Illustration"
            className="h-200 object-contain"
          />
        </div>

        <Card className="w-full sm:w-11/12 md:w-4/5 lg:w-3/5 xxl:w-2/5 p-12 flex flex-col justify-center min-h-[480px] mx-auto">
          <CardContent className="space-y-9 p-4">
            <h2
              className="text-2xl font-bold text-center bg-gradient-to-r from-[#50B498] to-[#2E7D6D] bg-clip-text"
              style={{
                color: '#096B68',
                fontFamily: "'Nunito', sans-serif"
              }}
            >
              Login Form
            </h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="w-full lg:w-10/12 md:w-9/12 mx-auto">
                <Input
                  type="text"
                  placeholder="Username"
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
              Don’t have an account?{' '}
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
