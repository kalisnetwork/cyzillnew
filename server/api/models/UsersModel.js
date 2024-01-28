import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
    },
    phoneNumber: {
        type: String,
        unique: true,
        sparse: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    termsAccepted: {
        type: mongoose.Schema.Types.Mixed,
    },
    photo: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    },
    saved: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ListingsCard'
    }]
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        try {
            this.password = await bcrypt.hash(this.password, 10);
        } catch (error) {
            throw error;
        }
    }
    next();
});


userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};


const User = mongoose.model('User', userSchema);

export default User;
