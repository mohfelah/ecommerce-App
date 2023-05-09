import express from "express";
import { isAdmin, requireSignIn } from "../middelware/authMiddleware.js";
import formidable from "express-formidable";
import { createProductController, deleteProductController, getProductController, getSingleProductController, productCountController, productFiltersController, productListController, productPhotoController, realtedProductController, searchProductController, updateProductController } from "../controllers/productController.js";


const router = express.Router();

//routes
//http://localhost:5000/api/v1/product/create-product
router.post("/create-product", requireSignIn, isAdmin, formidable(), createProductController)

//get products
//http://localhost:5000/api/v1/product/get-product
router.get("/get-product", getProductController);

//single product
//http://localhost:5000/api/v1/product/get-product/:slug
router.get("/get-product/:slug", getSingleProductController);

//get photo
//http://localhost:5000/api/v1/product/product-photo/:pid
router.get("/product-photo/:pid", productPhotoController);

//update routes
//http://localhost:5000/api/v1/product/update-product/:pid
router.put("/update-product/:pid", requireSignIn, isAdmin, formidable(), updateProductController);

//delete product
//http://localhost:5000/api/v1/product/delete-product/:pid
router.delete("/delete-product/:pid", deleteProductController);

//filter product
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", realtedProductController);

export default router;