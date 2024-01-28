// Signup.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = () => {
        console.log('Signing up...');
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white border-2 border-violet-500 p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4">Signup</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="w-full border rounded border-2 border-violet-500 px-3 py-2"
                        type="text"
                        id="name"
                        placeholder='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="w-full border rounded border-2 border-violet-500 px-3 py-2"
                        type="email"
                        id="email"
                        placeholder='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="w-full border rounded border-2 border-violet-500 px-3 py-2"
                        type="password"
                        id="password"
                        placeholder='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={handleSignup}
                >
                    Signup
                </button>
                <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Don't have an account?</span>
                    <Link to={'login'}
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
