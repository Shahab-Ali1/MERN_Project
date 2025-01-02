import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            unique: true, // Each category should be unique
        },
        description: {
            type: String,
            trim: true,
        },
        image: {
            type: String, // URL for a category image
        },
        status: {
            type: Boolean,
            default: true, // Active by default
        },
    },
    { timestamps: true }
);

export const Category = mongoose.model("Category", categorySchema);