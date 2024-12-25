import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const generateAccessTokenAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh token");
    }
}
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, } = req.body;
    if ([username, email, password].some(fields => fields.trim() === "")) {
        throw new ApiError(400, "All Fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{ email }]
    });
    if (existedUser) {
        throw new ApiError(409, "This Email is already existed, please try new one");
    }

    const avatarLocalPath = req?.files?.avatar[0]?.path;
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required");
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if (!avatar) {
        throw new ApiError(400, "Avatar is required");
    }
    const user = await User.create({
        username: username.toLowerCase(),
        email,
        password,
        avatar: avatar.url
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Register Successfully")
    )

});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        // throw new ApiError(400, "Email or Password is required")
        res.status(404).json({
            success: false,
            message: "Email or Password is required",
        })
    }
    const user = await User.findOne({
        $or: [{ email }]
    })
    if (!user) {
        // throw new ApiError(400, "This user is not exist, please register yourself");
        return res.status(404).json({
            success: false,
            message: "This user does not exist, please register yourself",
        });
    }
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        // throw new ApiError(400, "Please enter correct password");
        res.status(404).json({
            success: false,
            message: "Please enter correct password",
        })
    }
    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
    const userObj = { ...loggedInUser._doc, accessToken, refreshToken };

    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).json(
        new ApiResponse(
            200,
            userObj,
            "User logged in successfully"
        )
    )

})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        }
    );
    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options).json(
        new ApiResponse(200, {}, "User logout successfully")
    )
})

export { registerUser, loginUser, logoutUser };