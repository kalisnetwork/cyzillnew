import Save from '../models/SaveModel.js';
import Listing from '../models/PropertyModel.js';

export const getAllSaves = async (req, res) => {
    try {
        const listings = await Save.find({ user: req.user.id }).populate('listing');
        res.json({ listings });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createSave = async (req, res) => {
    try {
        const save = new Save({ listing: req.body.listing_id, user: req.user.id });
        await save.save();
        const listing = await Listing.findById(req.body.listing_id);
        if (!listing) {
            return res.status(404).json({ errors: ['Listing not found'] });
        }
        res.json({ listing });
    } catch (err) {
        res.status(422).json({ errors: err.errors });
    }
};

export const deleteSave = async (req, res) => {
    try {
        const save = await Save.findOneAndDelete({ listing: req.params.id, user: req.user.id });
        if (!save) {
            return res.status(422).json({ message: 'Save not found' });
        }
        const listing = await Listing.findById(req.params.id);
        res.json({ listing });
    } catch (err) {
        res.status(422).json({ message: err.message });
    }
};
