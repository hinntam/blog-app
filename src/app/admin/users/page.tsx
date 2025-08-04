'use client';

import { useState, useEffect } from 'react';
import { useUserAuth } from '../../_utils/auth-context';

interface User {
  user_id: number;
  username: string;
  email: string;
  created_at: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useUserAuth();

  useEffect(() => {
    if (user) {
      fetchUsers();
    }
  }, [user]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users/all');
      const data = await response.json();
      
      if (response.ok) {
        setUsers(data.users);
      } else {
        setError(data.error);
      }
    } catch {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-300">Please log in to access the admin panel.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6 mt-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8">
          <div className="flex justify-between items-center mb-6 mt-6">
            <h1 className="text-3xl font-bold text-white">Registered Users</h1>
            <button
              onClick={fetchUsers}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Refresh
            </button>
          </div>

          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              <span className="ml-3 text-white">Loading users...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6">
              <p className="text-red-200">{error}</p>
            </div>
          )}

          {!loading && !error && users.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-300">No users found in the database.</p>
            </div>
          )}

          {!loading && !error && users.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="pb-3 text-white font-semibold">Avatar</th>
                    <th className="pb-3 text-white font-semibold">User ID</th>
                    <th className="pb-3 text-white font-semibold">Username</th>
                    <th className="pb-3 text-white font-semibold">Email</th>
                    <th className="pb-3 text-white font-semibold">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.user_id} className="border-b border-white/10 hover:bg-white/5">
                      <td className="py-4">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-semibold">
                            {user.username.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 text-white font-mono">
                        {user.user_id}
                      </td>
                      <td className="py-4 text-white">
                        {user.username}
                      </td>
                      <td className="py-4 text-gray-300">{user.email}</td>
                      <td className="py-4 text-gray-300">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">Database Stats</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-300">Total Users: </span>
                <span className="text-white font-semibold">{users.length}</span>
              </div>
              <div>
                <span className="text-gray-300">Registered Today: </span>
                <span className="text-white font-semibold">
                  {users.filter(u => {
                    const today = new Date().toDateString();
                    return new Date(u.created_at).toDateString() === today;
                  }).length}
                </span>
              </div>
              <div>
                <span className="text-gray-300">This Week: </span>
                <span className="text-white font-semibold">
                  {users.filter(u => {
                    const oneWeekAgo = new Date();
                    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                    return new Date(u.created_at) > oneWeekAgo;
                  }).length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
