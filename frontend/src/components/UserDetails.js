import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { userAPI } from '../services/api';

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await userAPI.getUserById(id);
      setUser(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${user.name}? This action cannot be undone.`)) {
      return;
    }

    try {
      setDeleteLoading(true);
      await userAPI.deleteUser(id);
      navigate('/', { state: { message: `${user.name} has been deleted successfully` } });
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div>Loading user details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="error-message">
          Error: {error}
        </div>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          Back to Dashboard
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <div className="error-message">
          User not found
        </div>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {location.state?.message && (
        <div className="success-message">
          {location.state.message}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2>User Details</h2>
        <div className="flex gap-4">
          <button
            onClick={() => navigate(`/users/${id}/edit`)}
            className="btn btn-primary"
          >
            Edit User
          </button>
          <button
            onClick={handleDelete}
            disabled={deleteLoading}
            className="btn btn-danger"
          >
            {deleteLoading ? 'Deleting...' : 'Delete User'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="card">
          <h3 className="text-xl font-semibold mb-4">Basic Information</h3>
          <div className="space-y-3">
            <div>
              <label className="form-label">Full Name</label>
              <p className="text-lg font-medium">{user.name}</p>
            </div>
            <div>
              <label className="form-label">Email Address</label>
              <p>{user.email}</p>
            </div>
            <div>
              <label className="form-label">Phone Number</label>
              <p>{user.phone}</p>
            </div>
            <div>
              <label className="form-label">Company</label>
              <p>{user.company}</p>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="card">
          <h3 className="text-xl font-semibold mb-4">Address Information</h3>
          <div className="space-y-3">
            <div>
              <label className="form-label">Street Address</label>
              <p>{user.address.street}</p>
            </div>
            <div>
              <label className="form-label">City</label>
              <p>{user.address.city}</p>
            </div>
            <div>
              <label className="form-label">Zipcode</label>
              <p>{user.address.zipcode}</p>
            </div>
            <div>
              <label className="form-label">Coordinates</label>
              <p>
                <strong>Latitude:</strong> {user.address.geo.lat}<br />
                <strong>Longitude:</strong> {user.address.geo.lng}
              </p>
            </div>
          </div>
        </div>
      </div>

      

      {/* Additional Information */}
      <div className="card mt-6">
        <h3 className="text-xl font-semibold mb-4">Additional Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="form-label">Created</label>
            <p>{new Date(user.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
          </div>
          <div>
            <label className="form-label">Last Updated</label>
            <p>{new Date(user.updatedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button onClick={() => navigate('/')} className="btn btn-secondary">
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
