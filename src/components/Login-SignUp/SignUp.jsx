import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './style/button';
import { Input } from './style/input';
import { Card, CardContent } from './style/card';
import { Toaster, toast } from 'sonner';
import { Eye, EyeOff, Key } from 'lucide-react';

function SignUp() {
    const navigate = useNavigate();

    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Validate one field at a time
    const validateField = (name, value) => {
        let error = '';

        switch (name) {
            case 'fullName':
                if (!value.trim()) error = 'Full name is required.';
                break;
            case 'username':
                if (!value.trim()) error = 'Username is required.';
                break;
            case 'email':
                if (!value.includes('@')) error = 'Enter a valid email address.';
                break;
            case 'gender':
                if (!value) error = 'Please select a gender.';
                break;

            case 'phone':
                if (!/^\d{10}$/.test(value)) error = 'Phone must be 10 digits.';
                break;
            case 'password':
                const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
                if (!passwordRegex.test(value)) {
                    error = 'Password must be at least 8 characters, include a number, a letter, and a special character.';
                }
                break;
            case 'confirmPassword':
                if (value !== password) error = 'Passwords do not match.';
                break;
            default:
                break;
        }

        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    // Handlers that update state + validate inline
    const handleFullNameChange = (e) => {
        setFullName(e.target.value);
        validateField('fullName', e.target.value);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        validateField('username', e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        validateField('email', e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
        validateField('phone', e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        validateField('password', e.target.value);
        // Re-validate confirm password since password changed
        validateField('confirmPassword', confirmPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        validateField('confirmPassword', e.target.value);
    };

    // Final validation on submit
    const validateForm = () => {
        const newErrors = {};
        if (!fullName.trim()) newErrors.fullName = 'Full name is required.';
        if (!username.trim()) newErrors.username = 'Username is required.';
        if (!email.includes('@')) newErrors.email = 'Enter a valid email address.';
        if (!gender) newErrors.gender = 'Please select a gender.';
        if (!/^\d{10}$/.test(phone)) newErrors.phone = 'Phone must be 10 digits.';
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (!passwordRegex.test(password))
            newErrors.password =
                'Password must be at least 8 characters, include a number, a letter, and a special character.';
        if (confirmPassword !== password) newErrors.confirmPassword = 'Passwords do not match.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await fetch('https://your-backend-api.com/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullName, username, email, phone, gender, password, confirmPassword }),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message || 'Something went wrong!');
                return;
            }

            toast.success('Account created successfully!');
            setTimeout(() => navigate('/'), 1500); //redirect to login page after 1.5 seconds
        } catch (error) {
            console.error('Signup error:', error);
            toast.error('Failed to connect to server.');
        }
    };

    return (
        <div className="min-h-screen  flex items-center justify-center px-4"
            style={{ background: 'linear-gradient(to bottom, rgba(80, 180, 152, 0.1), rgba(80, 180, 152, 0.4))' }}>
            <Toaster position="top-right" richColors />

            <div className="w-full max-w-3xl bg-white shadow-3xl border border-gray-200 rounded-2xl p-10">
                <h2 className="text-3xl font-bold text-center text-[#096B68] mb-8"
                    style={{ fontFamily: "'Nunito', sans-serif" }}>Create Account</h2>

                <form onSubmit={handleSignUp} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-700">
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                            type="text"
                            value={fullName}
                            onChange={handleFullNameChange}
                            required
                            placeholder="Enter Your Name"
                        />
                        {errors.fullName && <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-700">
                            Username <span className="text-red-500">*</span>
                        </label>
                        <Input
                            type="text"
                            value={username}
                            onChange={handleUsernameChange}
                            required
                        />
                        {errors.username && <p className="text-sm text-red-500 mt-1">{errors.username}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-700">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <Input
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-700">
                            Gender <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={gender}
                            onChange={(e) => {
                                setGender(e.target.value);
                                validateField('gender', e.target.value);
                            }}
                            onBlur={(e) => validateField('gender', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>

                        {errors.gender && <p className="text-sm text-red-500 mt-1">{errors.gender}</p>}
                    </div>


                    <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-700">
                            Phone <span className="text-red-500">*</span>
                        </label>
                        <Input
                            type="tel"
                            value={phone}
                            onChange={handlePhoneChange}
                            required
                        />
                        {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-semibold mb-1 text-gray-700">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={handlePasswordChange}
                            required
                            className="pr-10"
                        />
                        <span
                            className="absolute right-3 top-10 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-[#219C90]"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </span>
                        {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-semibold mb-1 text-gray-700">
                            Confirm Password <span className="text-red-500">*</span>
                        </label>
                        <Input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required
                            className="pr-10"
                        />
                        <span
                            className="absolute right-3 top-10 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-[#219C90]"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </span>
                        {errors.confirmPassword && (
                            <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
                        )}
                    </div>

                    <div className="md:col-span-2">
                        <Button
                            type="submit"
                            className="w-full  text-white font-medium py-2 rounded-lg transition duration-300"
                        >
                            Sign Up
                        </Button>


                        <div className="text-center text-md mt-4">
                            Already have an account?{' '}
                            <button type="button" className="text-[#219C90] hover:underline" onClick={() => navigate('/login')}>
                                Login
                            </button>
                        </div>
                    </div>
                </form>

            </div>
            
        </div>
    );
}

export default SignUp;