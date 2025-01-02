import { Router } from "express";
import { deleteProduct, getProduct, saveProduct, updateProduct } from "../controllers/product.controller.js";

const router = Router();

router.route("/getProduct").post(getProduct);
router.route("/addProduct").post(saveProduct);
router.route("/updateProduct").post(updateProduct);
router.route("/deleteProduct").post(deleteProduct);

export default router;