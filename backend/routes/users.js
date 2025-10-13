const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

// Validation middleware
const validateUser = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('phone')
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),
  body('company')
    .notEmpty()
    .withMessage('Company is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Company name must be between 2 and 100 characters'),
  body('address.street')
    .notEmpty()
    .withMessage('Street address is required')
    .isLength({ min: 5, max: 200 })
    .withMessage('Street address must be between 5 and 200 characters'),
  body('address.city')
    .notEmpty()
    .withMessage('City is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('City name must be between 2 and 50 characters'),
body('address.zipcode')
  .matches(/^(\d{5}(-\d{4})?|\d{6})$/)
  .withMessage('Please provide a valid 5-digit (U.S.) or 6-digit (Indian) zipcode'),
  body('address.geo.lat')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be between -90 and 90'),
  body('address.geo.lng')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be between -180 and 180')
];

// GET /api/users - Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: error.message
    });
  }
});

// GET /api/users/:id - Get single user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user',
      error: error.message
    });
  }
});

// POST /api/users - Create new user
router.post('/', validateUser, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    const user = new User(req.body);
    await user.save();
    
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user
    });
  } catch (error) {
    console.error('Error creating user:', error);
    
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'User with this email already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to create user',
      error: error.message
    });
  }
});

// PUT /api/users/:id - Update user
router.put('/:id', validateUser, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    // Check if user exists
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if email is being changed and if new email already exists
    if (req.body.email !== user.email) {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'User with this email already exists'
        });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser
    });
  } catch (error) {
    console.error('Error updating user:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format'
      });
    }
    
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'User with this email already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to update user',
      error: error.message
    });
  }
});

// DELETE /api/users/:id - Delete user
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      message: 'User deleted successfully',
      data: user
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to delete user',
      error: error.message
    });
  }
});

module.exports = router;
