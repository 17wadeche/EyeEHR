import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useAuth } from '../../hooks/useAuth';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export default function UserManagementPage() {
  const { authenticated } = useAuth('admin');
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState({ name: '', email: '', role: 'doctor', password: '' });

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      alert('User created');
      window.location.reload();
    } else {
      alert('Failed to create user');
    }
  };

  if (!authenticated) return null;

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-4">User Management</h1>

      <form onSubmit={handleCreateUser} className="bg-white p-4 rounded shadow space-y-4 max-w-md mb-6">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <select
          value={form.role}
          onChange={e => setForm({ ...form, role: e.target.value })}
          className="w-full border p-2 rounded"
        >
          <option value="admin">Admin</option>
          <option value="doctor">Doctor</option>
          <option value="tech">Tech</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Create User</button>
      </form>

      <h2 className="text-xl font-semibold mb-2">Existing Users</h2>
      <table className="w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
