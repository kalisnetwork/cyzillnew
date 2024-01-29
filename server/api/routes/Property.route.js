import express from 'express';
import { getProperties, getProperty, createProperty, updateProperty, deleteProperty, getPropertiesForUser, searchProperties } from '../controllers/PropertyController.js';

const router = express.Router();

// Get all properties
router.get('/properties', getProperties);

// Search for properties
router.get('/properties/search', searchProperties);

// Get a single property by ID
router.get('/properties/:id', getProperty);

// Create a new property
router.post('/properties', createProperty);

// Update a property
router.put('/properties/:id', updateProperty);

// Delete a property
router.delete('/properties/:id', deleteProperty);

// Get properties for a specific user
router.get('/properties/user/:username', getPropertiesForUser);

export default router;
