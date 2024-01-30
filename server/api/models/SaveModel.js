import mongoose from 'mongoose';

const saveSchema = new mongoose.Schema({
    saver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
}, { timestamps: true });

saveSchema.index({ saver: 1, listing: 1 }, { unique: true });

const Save = mongoose.model('Save', saveSchema);

export default Save;
