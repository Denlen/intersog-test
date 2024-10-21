import React, { useState } from 'react';
import axios from 'axios';

interface UserAddModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUserAdded: (user: any) => void; 
}

const UserAddModal: React.FC<UserAddModalProps> = ({ isOpen, onClose, onUserAdded }) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>(''); 
    const [role, setRole] = useState<string>('regular');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null); 

        if (password !== passwordConfirmation) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('/users', {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation, 
                role,
            });

            setName('');
            setEmail('');
            setPassword('');
            setPasswordConfirmation(''); 
            setRole('regular');
            onUserAdded(response.data); 
            onClose(); 
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.data) {
                setError(err.response.data.message || 'Error adding user');
            } else {
                setError('An error occurred while adding the user');
            }
        }
    };

    if (!isOpen) return null; 

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-600 opacity-50"></div>
            <div className="bg-white rounded-lg shadow-lg z-10 p-5">
                <h2 className="text-xl font-semibold mb-4">Add User</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2">Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border rounded w-full py-2 px-3"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border rounded w-full py-2 px-3"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border rounded w-full py-2 px-3"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Confirm Password:</label>
                        <input
                            type="password"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            className="border rounded w-full py-2 px-3"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Role:</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="border rounded w-full py-2 px-3"
                        >
                            <option value="regular">Regular</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-2 border rounded px-4 py-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white rounded px-4 py-2"
                        >
                            Add User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserAddModal;
