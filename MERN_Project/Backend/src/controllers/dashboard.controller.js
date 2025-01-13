import { Category } from "../models/category.model.js";
import { Product } from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getDashboardStats = asyncHandler(async (req, res) => {
    const totalCategory = await Category.countDocuments({ status: true });
    const totalProduct = await Product.countDocuments({ status: true });
    const lowStockItems = await Product.find({ status: true, stock: { $lt: 10 } }).countDocuments();

    const products = await Product.find({ status: true }).select("-__v")
        .populate("category", "name description status") // Populate category with name and description
        .exec(); // Executes the query

    const categories = await Category.find({ status: true }).select("-__v");
    const data = {
        totalCategory,
        totalProduct,
        lowStockItems,
        products,
        categories
    };  

    res.status(200).json(
        new ApiResponse(200, data, "Dashboard Stats Fetched Successfully")
    );
});

export { getDashboardStats };