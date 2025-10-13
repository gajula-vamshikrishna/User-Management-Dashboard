import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userAPI } from '../services/api';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await userAPI.getAllUsers();
      setUsers(response.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, userName) => {
    if (!window.confirm(`Are you sure you want to delete ${userName}?`)) {
      return;
    }

    try {
      await userAPI.deleteUser(id);
      setUsers(users.filter(user => user._id !== id));
      setDeleteMessage(`${userName} has been deleted successfully`);
      setTimeout(() => setDeleteMessage(''), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div>Loading users...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2>Users Dashboard</h2>
        <Link to="/users/new" className="btn btn-primary">
          Add New User
        </Link>
      </div>

      {deleteMessage && (
        <div className="success-message">
          {deleteMessage}
        </div>
      )}

      {error && (
        <div className="error-message">
          Error: {error}
        </div>
      )}

      {users.length === 0 ? (
        <div className="card text-center">
          <h3>No users found</h3>
          <p className="mt-4">Get started by adding your first user.</p>
          <Link to="/users/new" className="btn btn-primary mt-4">
            Add User
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 grid-cols-2 grid-cols-3">
          {users.map((user) => (
            <div key={user._id} className="card">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <p className="text-gray-600">{user.company}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-sm text-gray-500">{user.phone}</p>
              </div>
              
              <div className="mb-4">
                <p className="text-sm">
                  <strong>Address:</strong><br />
                  {user.address.street}<br />
                  {user.address.city}, {user.address.zipcode}
                </p>
              </div>

              <div className="flex gap-4">
                <Link 
                  to={`/users/${user._id}`} 
                  className="btn btn-secondary btn-sm"
                >
                  View
                </Link>
                <Link 
                  to={`/users/${user._id}/edit`} 
                  className="btn btn-primary btn-sm"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(user._id, user.name)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
