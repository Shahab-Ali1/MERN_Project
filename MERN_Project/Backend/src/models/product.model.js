import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category", // Reference to the Category model
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        stock: {
            type: Number,
            required: true,
            min: 0,
        },
        image: {
            type: String, // URL for product image
        },
        status: {
            type: Boolean,
            default: true, // Available by default
        },
    },
    { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
