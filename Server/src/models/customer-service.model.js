import mongoose, { Schema } from 'mongoose';
import { generateId } from '../utils/generateId.js'


const customerServiceSchema = new Schema({
    id: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        index: true,
        default: generateId,
    },
    type: {
        type: String,
        trim: true,
        required: true
    },
    whatsapp: {
        type: String,
        trim: true,
    },
    phone: {
        type: String,
        unique: true,
        required: true,
        minlength: 10,
        maxlength: 13
    }
}, {timestamps: true});

export const CustomerService = mongoose.model("CustomerService", customerServiceSchema);