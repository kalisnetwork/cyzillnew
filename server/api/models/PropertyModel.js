import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
    phoneNumber: String,
    mainPhoto: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    propertyManagerType: {
        type: String,
        required: true,
    },
    propertyTransactionType: {
        type: String,
        required: true,
    },
    propertyType: String,
    unitsInBuilding: Number,
    totalUnits: Number,
    location: {
        latitude: Number,
        longitude: Number,
        address: String,
    },
    propertyDescription: String,
    bedrooms: Number,
    bathrooms: Number,
    buildingFloors: Number,
    unitFloorNumber: Number,
    furnishingStatus: String,
    coveredArea: Number,
    carpetArea: Number,
    yearOfConstruction: Number,
    propertyAmenities: [String],
    photos: [String],
    price: {
        type: Number,
        required: true,
    },
    securityDeposit: Number,
    priceInclusions: {
        type: String,
        required: true,
    },
    maintenanceCharges: Number,
    membershipStatus: {
        type: String,
        enum: ['silver', 'gold', 'diamond', 'platinum'],
        default: 'silver',
    },
    propertyStatus: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
    isStampDutyExcluded: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

propertySchema.index({ '$**': 'text' });

const Property = mongoose.model('Property', propertySchema);

export default Property;
