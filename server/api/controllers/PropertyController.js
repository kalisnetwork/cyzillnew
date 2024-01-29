import Property from '../models/PropertyModel.js';

// Get all properties with pagination and sorting
export const getProperties = async (req, res) => {
    try {
        const { page = 1, limit = 30, sortBy = 'date', order = 'desc' } = req.query;
        const properties = await Property.find()
            .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        const count = await Property.countDocuments();
        res.status(200).json({
            properties,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Search for properties
export const searchProperties = async (req, res) => {
    try {
        const { keyword } = req.query;
        const properties = await Property.find({ $text: { $search: keyword } });
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single property by ID
export const getProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.status(200).json(property);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new property
export const createProperty = async (req, res) => {
    try {
        // Check if a property with the same details already exists
        const existingProperty = await Property.findOne(req.body);
        if (existingProperty) {
            return res.status(400).json({ message: 'A property with the same details already exists.' });
        }

        // If not, create a new property
        const property = new Property(req.body);
        await property.save();
        res.status(201).json(property);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a property
export const updateProperty = async (req, res) => {
    try {
        const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProperty) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.status(200).json(updatedProperty);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a property
export const deleteProperty = async (req, res) => {
    try {
        const property = await Property.findByIdAndDelete(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.status(200).json({ message: 'Property deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get properties for a specific user
export const getPropertiesForUser = async (req, res) => {
    try {
        const username = req.params.username;
        const properties = await Property.find({ username: username });
        res.json(properties);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
