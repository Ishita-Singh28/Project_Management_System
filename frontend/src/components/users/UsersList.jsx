import React from 'react';

export default function UsersList({ users }) {
    if (!users.length) return null;

    return (
        <div className="bg-[#2a2a2a] p-6 rounded-xl mt-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Users</h3>
                <button className="border border-gray-500 px-3 py-1 rounded text-sm hover:bg-[#3a3a3a]">
                    Create User
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-gray-300">
                    <thead>
                        <tr className="border-b border-gray-600">
                            <th className="text-left py-2">Name</th>
                            <th className="text-left py-2">Email</th>
                            <th className="text-left py-2">Created Date</th>
                            <th className="text-left py-2">View</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map(user => (
                            <tr key={user._id} >
                                <td className="py-2">{user.username}</td>
                                <td className="py-2">{user.email}</td>
                                <td className="py-2">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                                <td className="py-2">
                                    <button className="border border-gray-500 px-3 py-1 rounded text-xs hover:bg-[#3a3a3a]">
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
