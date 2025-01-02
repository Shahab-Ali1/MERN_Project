import { Router } from "express";
import { deleteCategory, getCategory, saveCategory, updateCategory } from "../controllers/category.controller.js";
// import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// router.route("/addCategory").post(upload.fields([{ name: "image", maxCount: 1 }]), saveCategory);
router.route("/getCategory").post(getCategory);
router.route("/addCategory").post(saveCategory);
router.route("/updateCategory").post(updateCategory);
router.route("/deleteCategory").post(deleteCategory);

export default router;