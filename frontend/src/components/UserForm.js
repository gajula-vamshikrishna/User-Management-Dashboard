import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userAPI } from '../services/api';

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: {
      street: '',
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: ''
      }
    }
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (isEdit) {
      fetchUser();
    }
  }, [id, isEdit]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getUserById(id);
      setFormData(response.data);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setLoading(false);
    }
  };

  
  const validateForm = () => {
    const newErrors = {};

    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

   
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    
    if (!formData.company.trim()) {
      newErrors.company = 'Company is required';
    } else if (formData.company.trim().length < 2) {
      newErrors.company = 'Company name must be at least 2 characters long';
    }

   
    if (!formData.address.street.trim()) {
      newErrors.street = 'Street address is required';
    }

    if (!formData.address.city.trim()) {
      newErrors.city = 'City is required';
    }

    
    const zipcodeRegex = /^(\d{5}(-\d{4})?|\d{6})$/;
    if (!formData.address.zipcode.trim()) {
      newErrors.zipcode = 'Zipcode is required';
    } else if (!zipcodeRegex.test(formData.address.zipcode)) {
      newErrors.zipcode = 'Please enter a valid 5-, 5+4-digit (US) or 6-digit (Indian) zipcode';
    }

    const lat = parseFloat(formData.address.geo.lat);
    const lng = parseFloat(formData.address.geo.lng);

    if (formData.address.geo.lat === '' || formData.address.geo.lat === null || isNaN(lat)) {
      newErrors.lat = 'Latitude is required';
    } else if (lat < -90 || lat > 90) {
      newErrors.lat = 'Latitude must be between -90 and 90';
    }

    if (formData.address.geo.lng === '' || formData.address.geo.lng === null || isNaN(lng)) {
      newErrors.lng = 'Longitude is required';
    } else if (lng < -180 || lng > 180) {
      newErrors.lng = 'Longitude must be between -180 and 180';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parent, child, grandchild] = name.split('.');

      if (grandchild) {
       
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: {
              ...prev[parent][child],
              [grandchild]: value
            }
          }
        }));
      } else {
       
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value
          }
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      setSubmitError('');

    
      const submitData = {
        ...formData,
        address: {
          ...formData.address,
          geo: {
            lat: parseFloat(formData.address.geo.lat),
            lng: parseFloat(formData.address.geo.lng)
          }
        }
      };

      if (isEdit) {
        await userAPI.updateUser(id, submitData);
        navigate(`/users/${id}`, { state: { message: 'User updated successfully!' } });
      } else {
        const response = await userAPI.createUser(submitData);
        navigate(`/users/${response.data._id}`, { state: { message: 'User created successfully!' } });
      }
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setLoading(false);
    }
  };
  if (isEdit && loading && !formData.name) {
    return (
      <div className="loading">
        <div>Loading user data...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2>{isEdit ? 'Edit User' : 'Add New User'}</h2>
        <p className="text-gray-600 mt-2">
          {isEdit ? 'Update the user information below.' : 'Fill in the form below to add a new user.'}
        </p>
      </div>

      {submitError && (
        <div className="error-message">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card">
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`form-input ${errors.name ? 'error' : ''}`}
              placeholder="Enter full name"
            />
            {errors.name && <div className="form-error">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`form-input ${errors.email ? 'error' : ''}`}
              placeholder="Enter email address"
            />
            {errors.email && <div className="form-error">{errors.email}</div>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label className="form-label" htmlFor="phone">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`form-input ${errors.phone ? 'error' : ''}`}
              placeholder="Enter phone number"
            />
            {errors.phone && <div className="form-error">{errors.phone}</div>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="company">
              Company *
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className={`form-input ${errors.company ? 'error' : ''}`}
              placeholder="Enter company name"
            />
            {errors.company && <div className="form-error">{errors.company}</div>}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="address.street">
            Street Address *
          </label>
          <input
            type="text"
            id="address.street"
            name="address.street"
            value={formData.address.street}
            onChange={handleInputChange}
            className={`form-input ${errors.street ? 'error' : ''}`}
            placeholder="Enter street address"
          />
          {errors.street && <div className="form-error">{errors.street}</div>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label className="form-label" htmlFor="address.city">
              City *
            </label>
            <input
              type="text"
              id="address.city"
              name="address.city"
              value={formData.address.city}
              onChange={handleInputChange}
              className={`form-input ${errors.city ? 'error' : ''}`}
              placeholder="Enter city"
            />
            {errors.city && <div className="form-error">{errors.city}</div>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="address.zipcode">
              Zipcode *
            </label>
            <input
              type="text"
              id="address.zipcode"
              name="address.zipcode"
              value={formData.address.zipcode}
              onChange={handleInputChange}
              className={`form-input ${errors.zipcode ? 'error' : ''}`}
              placeholder="12345 or 12345-6789"
            />
            {errors.zipcode && <div className="form-error">{errors.zipcode}</div>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label className="form-label" htmlFor="address.geo.lat">
              Latitude *
            </label>
            <input
              type="number"
              id="address.geo.lat"
              name="address.geo.lat"
              value={formData.address.geo.lat}
              onChange={handleInputChange}
              className={`form-input ${errors.lat ? 'error' : ''}`}
              placeholder="e.g., 40.7128"
              step="any"
              min="-90"
              max="90"
            />
            {errors.lat && <div className="form-error">{errors.lat}</div>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="address.geo.lng">
              Longitude *
            </label>
            <input
              type="number"
              id="address.geo.lng"
              name="address.geo.lng"
              value={formData.address.geo.lng}
              onChange={handleInputChange}
              className={`form-input ${errors.lng ? 'error' : ''}`}
              placeholder="e.g., -74.0060"
              step="any"
              min="-180"
              max="180"
            />
            {errors.lng && <div className="form-error">{errors.lng}</div>}
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-lg"
          >
            {loading ? 'Saving...' : (isEdit ? 'Update User' : 'Create User')}
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn btn-secondary btn-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
