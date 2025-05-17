import { useState } from 'react';

const AddCustomerForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        mobile: '',
        altMobile: '',
        dob: '',
        address: '',
        gender: '',
        pincode: '',
        branch: '',
        documents: {
            aadhaar: null,
            pan: null,
            voterId: null,
            photo: null,
        },
    });

    // Input styles with rounded corners and subtle shadow on focus
    const inputClasses =
        "border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition";

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (['aadhaar', 'pan', 'voterId', 'photo'].includes(name)) {
            const file = files[0];
            if (file && !file.type.startsWith('image/')) {
                alert('Only image files are allowed for documents.');
                e.target.value = null;
                return;
            }
            setFormData((prev) => ({
                ...prev,
                documents: {
                    ...prev.documents,
                    [name]: file,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        alert('Form submitted! Check console for data.');
        setFormData({
            firstName: '',
            middleName: '',
            lastName: '',
            email: '',
            mobile: '',
            altMobile: '',
            dob: '',
            address: '',
            pincode: '',
            branch: '',
            documents: {
                aadhaar: null,
                pan: null,
                voterId: null,
                photo: null,
            },
        });
    };

    const removeDocument = (docKey) => {
        setFormData((prev) => ({
            ...prev,
            documents: {
                ...prev.documents,
                [docKey]: null,
            },
        }));
    };

    return (
        <div className="flex justify-center mt-16 mb-16 px-4ex px-4">
            {/* Card container with rounded corners and shadow */}
            <div className=" rounded-3xl border border-gray-300 shadow-sm max-w-5xl w-full p-8 sm:p-10"
                style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #E1F7F5 40%, #ffffff 100%)',
                }}>
                <form onSubmit={handleSubmit} className="space-y-8">
                    <h2 className="text-3xl font-bold mb-6 text-center text-gray-800"
                        style={{
                            fontFamily: "'Nunito', sans-serif",
                            color: '#135D66'
                        }}>
                        Add Customer
                    </h2>

                    {/* Name Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <label className="flex flex-col">
                            <span className="mb-2 font-semibold text-gray-700">
                                First Name <span className="text-red-600">*</span>
                            </span>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                className={inputClasses}
                                onChange={handleChange}
                                value={formData.firstName}
                                required
                            />
                        </label>
                        <label className="flex flex-col">
                            <span className="mb-2 font-semibold text-gray-700">Middle Name</span>
                            <input
                                type="text"
                                name="middleName"
                                placeholder="Middle Name"
                                className={inputClasses}
                                onChange={handleChange}
                                value={formData.middleName}
                            />
                        </label>
                        <label className="flex flex-col">
                            <span className="mb-2 font-semibold text-gray-700">
                                Last Name <span className="text-red-600">*</span>
                            </span>
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                className={inputClasses}
                                onChange={handleChange}
                                value={formData.lastName}
                                required
                            />
                        </label>
                    </div>

                    {/* Other Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <label className="flex flex-col">
                            <span className="mb-2 font-semibold text-gray-700">
                                Email Id <span className="text-red-600">*</span>
                            </span>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className={inputClasses}
                                onChange={handleChange}
                                value={formData.email}
                                required
                            />
                        </label>
                        <label className="flex flex-col">
                            <span className="mb-2 font-semibold text-gray-700">
                                Mobile Number <span className="text-red-600">*</span>
                            </span>
                            <input
                                type="tel"
                                name="mobile"
                                placeholder="Mobile Number"
                                className={inputClasses}
                                onChange={handleChange}
                                value={formData.mobile}
                                required
                            />
                        </label>
                        <label className="flex flex-col">
                            <span className="mb-2 font-semibold text-gray-700">
                                Alternate Mobile Number 
                            </span>
                            <input
                                type="tel"
                                name="altMobile"
                                placeholder="Alternate Mobile Number"
                                className={inputClasses}
                                onChange={handleChange}
                                value={formData.altMobile}
                            />
                        </label>
                        <label className="flex flex-col">
                            <span className="mb-2 font-semibold text-gray-700">Date of Birth<span className="text-red-600">*</span></span>
                            <input
                                type="date"
                                name="dob"
                                className={inputClasses}
                                onChange={handleChange}
                                value={formData.dob}
                                required
                            />
                        </label>
                        <label className="flex flex-col">
                            <span className="mb-2 font-semibold text-gray-700">
                                Gender <span className="text-red-600">*</span>
                            </span>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className={`border border-gray-300 rounded-lg p-3 w-full shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${formData.gender === '' ? 'text-gray-400' : 'text-gray-700'
                                    }`}
                                required
                            >
                                <option value="" disabled hidden>
                                    Select Gender
                                </option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>

                        </label>


                        <label className="flex flex-col">
                            <span className="mb-2 font-semibold text-gray-700">
                                Pincode <span className="text-red-600">*</span>
                            </span>
                            <input
                                type="text"
                                name="pincode"
                                placeholder="Pincode"
                                className={inputClasses}
                                onChange={handleChange}
                                value={formData.pincode}
                                required
                            />
                        </label>
                        <label className="flex flex-col">
                            <span className="mb-2 font-semibold text-gray-700">
                                Branch Name <span className="text-red-600">*</span>
                            </span>
                            <input
                                type="text"
                                name="branch"
                                placeholder="Branch Name"
                                className={inputClasses}
                                onChange={handleChange}
                                value={formData.branch}
                                required
                            />
                        </label>
                    </div>

                    {/* Address */}
                    <label className="flex flex-col">
                        <span className="mb-2 font-semibold text-gray-700">
                            Address <span className="text-red-600">*</span>
                        </span>
                        <textarea
                            name="address"
                            placeholder="Address"
                            className={`${inputClasses} resize-none`}
                            rows="4"
                            onChange={handleChange}
                            value={formData.address}
                            required
                        />
                    </label>

                    {/* Document Upload */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                            Upload Documents <span className="text-red-600">*</span>
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                { key: 'aadhaar', label: 'Aadhaar Card' },
                                { key: 'pan', label: 'PAN Card' },
                                { key: 'voterId', label: 'Voter ID' },
                                { key: 'photo', label: 'Passport Size Photo' }
                            ].map(({ key, label }) => (
                                <label key={key} className="flex flex-col">
                                    <span className="mb-2 font-semibold text-gray-700">
                                        {label} (Image only) <span className="text-red-600">*</span>
                                    </span>

                                    {formData.documents[key] ? (
                                        <div className="flex items-center justify-between border border-gray-300 rounded-lg p-3 bg-gray-100 shadow-inner">
                                            <span className="truncate max-w-xs">{formData.documents[key].name}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeDocument(key)}
                                                className="ml-4 text-red-600 font-bold hover:text-red-800"
                                                aria-label={`Remove ${label}`}
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ) : (
                                        <input
                                            type="file"
                                            name={key}
                                            accept="image/*"
                                            className={`${inputClasses} mt-1 cursor-pointer`}
                                            onChange={handleChange}
                                            required
                                        />
                                    )}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button with rounded corners and shadow */}
                    <button
                        type="submit"
                        className="bg-[#129990] hover:bg-[#096B68] text-white font-semibold py-3 px-8 rounded-lg w-full shadow-md transition duration-300"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCustomerForm;