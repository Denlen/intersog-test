import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserAddModal from './UserAddModal';

interface User {
    id: number;
    name: string;
    email: string;
    roles: string[];
}

interface PaginatedResponse<T> {
    data: T[];
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
    };
}

const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [lastPage, setLastPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchUsers = async (page: number = 1) => {
        setLoading(true);
        try {
            const response = await axios.get(`/users?page=${page}`);
            const { data, meta }: PaginatedResponse<User> = response.data;

            setUsers(data);
            setCurrentPage(meta.current_page);
            setLastPage(meta.last_page);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(currentPage);
    }, [currentPage]);

    const handleUserAdded = (newUser: User) => {
        fetchUsers(1);
    };

    const handlePageChange = (page: number) => {
        if (page !== currentPage && page > 0 && page <= lastPage) {
            setCurrentPage(page);
        }
    };

    const renderPagination = () => {
        if (lastPage <= 1) return null;

        const pages = [];
        for (let i = 1; i <= lastPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`mx-1 px-3 py-1 rounded ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">User List</h1>
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-green-500 text-white rounded px-4 py-2 mb-4"
            >
                Add User
            </button>

            {loading ? (
                <p>Loading users...</p>
            ) : (
                <>
                    <table className="min-w-full border">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">Name</th>
                                <th className="border px-4 py-2">Email</th>
                                <th className="border px-4 py-2">Roles</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <tr key={user.id}>
                                        <td className="border px-4 py-2">{user.name}</td>
                                        <td className="border px-4 py-2">{user.email}</td>
                                        <td className="border px-4 py-2">{user.roles.join(', ')}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="border px-4 py-2 text-center" colSpan={3}>
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {lastPage > 1 && (
                        <div className="flex justify-between items-center mt-4">
                            <button 
                                onClick={() => handlePageChange(currentPage - 1)} 
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                            >
                                Previous
                            </button>

                            <div className="flex">{renderPagination()}</div>

                            <button 
                                onClick={() => handlePageChange(currentPage + 1)} 
                                disabled={currentPage === lastPage}
                                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}

            <UserAddModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onUserAdded={handleUserAdded}
            />
        </div>
    );
};

export default Users;
