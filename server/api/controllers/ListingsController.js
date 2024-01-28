import Listing from '../models/ListingsModel.js';

// Get all listings with pagination and sorting
export const getListings = async (req, res) => {
    try {
        const { page = 1, limit = 30, sortBy = 'date', order = 'desc' } = req.query;
        const listings = await Listing.find()
            .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        const count = await Listing.countDocuments();
        res.status(200).json({
            listings,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Search for listings
export const searchListings = async (req, res) => {
    try {
        const { keyword } = req.query;
        const listings = await Listing.find({ $text: { $search: keyword } });
        res.status(200).json(listings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single listing by ID
export const getListing = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        res.status(200).json(listing);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new listing
// Create a new listing
export const createListing = async (req, res) => {
    try {
        // Check if a listing with the same details already exists
        const existingListing = await Listing.findOne(req.body);
        if (existingListing) {
            return res.status(400).json({ message: 'A listing with the same details already exists.' });
        }

        // If not, create a new listing
        const listing = new Listing(req.body);
        await listing.save();
        res.status(201).json(listing);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update a listing
export const updateListing = async (req, res) => {
    try {
        const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedListing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        res.status(200).json(updatedListing);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a listing
export const deleteListing = async (req, res) => {
    try {
        const listing = await Listing.findByIdAndDelete(req.params.id);
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        res.status(200).json({ message: 'Listing deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get listings for a specific user
export const getListingsForUser = async (req, res) => {
    try {
        const username = req.params.username;
        const listings = await Listing.find({ username: username });
        res.json(listings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
