import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"

const getProduct = asyncHandler(async (req, res) => {
    const { status } = req.body;
    if (!status) {
        throw new ApiError(400, "Status is required in the request body");
    }
    // const products = await Product.find({ status }).select("-__v");
    const products = await Product.find({ status }).select("-__v")
        .populate("category", "name description status") // Populate category with name and description
        .exec(); // Executes the query
    return res.status(200).json(
        new ApiResponse(200, products, "Products Fetched Successfully")
    )
});
const saveProduct = asyncHandler(async (req, res) => {
    const { name, description, price, stock, status, categoryId } = req.body;
    if ([name, String(price), String(stock), categoryId].some(fields => fields.trim() === "")) {
        throw new ApiError(400, "Name, Price, Stock and Category Id are required");
    }

    const existedProduct = await Product.findOne({
        $or: [{ name: name.toLowerCase() }]
    });
    if (existedProduct) {
        throw new ApiError(409, "This Product is already existed, please try new one");
    }
    const productImgPath = req?.files?.image[0]?.path || "";
    const imgUrl = productImgPath && await uploadOnCloudinary(productImgPath);

    const product = await Product.create({
        name: name.toLowerCase(),
        description,
        price,
        stock,
        image: imgUrl?.url || "",
        status: status || true,
        category: categoryId
    });

    if (!product) {
        throw new ApiError(500, "Something went wrong while saving the product");
    }

    return res.status(201).json(
        new ApiResponse(200, product, "Product Saved Successfully")
    )
});
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, stock, status, categoryId, productId } = req.body;
    if ([name, String(price), String(stock), categoryId].some(fields => fields.trim() === "")) {
        throw new ApiError(400, "Name, Price, Stock and Category Id are required");
    }
    const product = await Product.findById(productId);
    if (!product) {
        throw new ApiError(404, "Product not found");
    }
    const existedProduct = await Product.findOne({
        $or: [{ name: name.toLowerCase() }]
    });
    if (existedProduct) {
        throw new ApiError(409, "This Product is already existed");
    }
    const updatedProduct = await Product.findByIdAndUpdate(productId, {
        name: name.toLowerCase(),
        price,
        stock,
        status,
        category: categoryId
    }, { new: true }
    ).populate("category", "name description status");
    if (!updatedProduct) {
        throw new ApiError(500, "Something went wrong while updating the category");
    }
    return res.status(200).json(
        new ApiResponse(200, updatedProduct, "Product Updated Successfully")
    )

});

const deleteProduct = asyncHandler(async (req, res) => {
    const { productId } = req.body;
    if (!productId) {
        throw new ApiError(400, "Product Id is required");
    }
    const product = await Product.findById(productId);
    if (!product) {
        throw new ApiError(404, "Product not found");
    }
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
        throw new ApiError(500, "Something went wrong while deleting the product");
    }
    return res.status(200).json(
        new ApiResponse(200, deletedProduct, "Product Deleted Successfully")
    )
});

export {
    getProduct,
    saveProduct,
    updateProduct,
    deleteProduct
}