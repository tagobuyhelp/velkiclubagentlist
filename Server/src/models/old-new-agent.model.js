import mongoose, { Schema } from 'mongoose';


const oldnewSchema = new Schema({
    oldId: {
        type: String,
        trim: true,
    },
    newId: {
        type: String,
        trim: true,
    },
    oldNumber: {
        type: String,
        trim: true,
    },
    newNumber: {
        type: String,
        trim: true
    }
}, {timestamps: true});

export const OldNew = mongoose.model("OldNew", oldnewSchema);