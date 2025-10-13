const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
  company: {
    type: String,
    required: [true, 'Company is required'],
    trim: true,
    minlength: [2, 'Company name must be at least 2 characters long'],
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  address: {
    street: {
      type: String,
      required: [true, 'Street address is required'],
      trim: true,
      minlength: [5, 'Street address must be at least 5 characters long'],
      maxlength: [200, 'Street address cannot exceed 200 characters']
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
      minlength: [2, 'City name must be at least 2 characters long'],
      maxlength: [50, 'City name cannot exceed 50 characters']
    },
   zipcode: {
  type: String,
  required: [true, 'Zipcode is required'],
  trim: true,
  match: [/^(\d{5}(-\d{4})?|\d{6})$/, 'Please enter a valid 5-digit (U.S.) or 6-digit (Indian) zipcode']
},
    geo: {
      lat: {
        type: Number,
        required: [true, 'Latitude is required'],
        min: [-90, 'Latitude must be between -90 and 90'],
        max: [90, 'Latitude must be between -90 and 90']
      },
      lng: {
        type: Number,
        required: [true, 'Longitude is required'],
        min: [-180, 'Longitude must be between -180 and 180'],
        max: [180, 'Longitude must be between -180 and 180']
      }
    }
  }
}, {
  timestamps: true
});

// Index for better query performance
userSchema.index({ email: 1 });
userSchema.index({ 'address.city': 1 });

module.exports = mongoose.model('User', userSchema);
