import { Category } from "../models/category.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const getCategory = asyncHandler(async (req, res) => {
    const { status } = req.body;
    if (!status) {
        throw new ApiError(400, "Status is required in the request body");
    }
    const categories = await Category.find({ status }).select("-__v");
    return res.status(200).json(
        new ApiResponse(200, categories, "Categories Fetched Successfully")
    )
});

const saveCategory = asyncHandler(async (req, res) => {
    const { name, description, status } = req.body;
    if ([name].some(fields => fields.trim() === "")) {
        throw new ApiError(400, "Name is required");
    }

    const existedCategory = await Category.findOne({
        $or: [{ name: name.toLowerCase() }]
    });
    if (existedCategory) {
        throw new ApiError(409, "This Category is already existed, please try new one");
    }
    const productImgPath = req?.files?.image[0]?.path || "";
    const imgUrl = productImgPath && await uploadOnCloudinary(productImgPath);

    const category = await Category.create({
        name: name.toLowerCase(),
        description,
        image: imgUrl?.url || "",
        status: status || true
    });

    if (!category) {
        throw new ApiError(500, "Something went wrong while saving the category");
    }

    return res.status(201).json(
        new ApiResponse(200, category, "Category Saved Successfully")
    )
});

const updateCategory = asyncHandler(async (req, res) => {
    const { categoryId, name, description, status } = req.body;
    if (!categoryId) {
        throw new ApiError(400, "Category Id is required");
    }
    const category = await Category.findById(categoryId);
    if (!category) {
        throw new ApiError(404, "Category not found");
    }
    const existedCategory = await Category.findOne({
        $or: [{ name: name.toLowerCase() }]
    });
    if (existedCategory) {
        throw new ApiError(409, "This Category is already existed");
    }
    const updatedCategory = await Category.findByIdAndUpdate(categoryId, {
        name: name.toLowerCase(),
        description,
        status
    }, { new: true });

    if (!updatedCategory) {
        throw new ApiError(500, "Something went wrong while updating the category");
    }

    return res.status(200).json(
        new ApiResponse(200, updatedCategory, "Category Updated Successfully")
    )
});

const deleteCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.body;
    if (!categoryId) {
        throw new ApiError(400, "Category Id is required");
    }
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
        throw new ApiError(404, "Category not found");
    }
    return res.status(200).json(
        new ApiResponse(200, deletedCategory, "Category Deleted Successfully")
    )
});

export {
    saveCategory,
    getCategory,
    updateCategory,
    deleteCategory
}