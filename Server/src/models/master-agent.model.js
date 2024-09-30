import mongoose, { Schema } from 'mongoose';
import { generateId } from '../utils/generateId.js'


const masterAgentSchema = new Schema({
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
    app: {
        type: String,
        trim: true,
    },
    phone: {
        type: String,
        unique: true,
        required: true,
        minlength: 10,
        maxlength: 13
    },
    upline: {
        type: Schema.Types.ObjectId,
        ref: 'SuperAgent',
        required: true,
    }
}, {timestamps: true});

export const MasterAgent = mongoose.model("MasterAgent", masterAgentSchema);