import express from 'express';
import { getListings, getListing, createListing, updateListing, deleteListing, getListingsForUser } from '../controllers/ListingsController.js';

const router = express.Router();

// Get all listings
router.get('/', getListings);

// Get a single listing by ID
router.get('/:id', getListing);

// Create a new listing
router.post('/', createListing);

// Update a listing
router.put('/:id', updateListing);

// Delete a listing
router.delete('/:id', deleteListing);

// Get listings for a specific user
router.get('/user/:username', getListingsForUser);

export default router;
