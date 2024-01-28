import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
    },
    photo: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    listingManagerType: {
        type: String,
        required: true
    },
    listingTransactionType: {
        type: String,
        required: true,
    },
    listingType: {
        type: String,
    },
    flatsInBuilding: {
        type: String,
    },
    totalFlats: {
        type: String,
    },
    location: {
        latitude: Number,
        longitude: Number,
        address: String
    },
    listingDescription: {
        type: String
    },
    bedrooms: {
        type: Number
    },
    bathrooms: {
        type: Number
    },
    buildingFloors: {
        type: Number
    },
    unitFloorNumber: {
        type: Number
    },
    furnishingStatus: {
        type: String,
    },
    coveredArea: {
        type: Number
    },
    carpetArea: {
        type: Number
    },
    yearOfConstruction: {
        type: Number
    },
    listingAmenities: {
        type: [String],
    },
    photos: [{
        type: String
    }],
    price: {
        type: Number,
        required: true
    },
    securityDeposit: {
        type: Number,
    },
    priceInclusions: {
        type: String,
        required: true
    },
    maintenanceCharges: {
        type: Number,
    },
    membershipStatus: {
        type: String,
        enum: ['silver', 'gold', 'diamond', 'platinum'],
        default: 'silver'
    },
    listingStatus: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    isStampDutyExcluded: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

listingSchema.index({ '$**': 'text' });

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;
