import mongoose, { Schema } from 'mongoose';
import { generateId } from '../utils/generateId.js'


const siteAdminSchema = new Schema({
    id: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        index: true,
        default: generateId,
    },
    fullname: {
        type: String,
        trim: true,
        required: true
    },
    telegram: {
        type: String,
        trim: true,
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

export const SiteAdmin = mongoose.model("SiteAdmin", siteAdminSchema);