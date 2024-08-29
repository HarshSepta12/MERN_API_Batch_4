import express  from "express";
import { addProduct, deleteProduct, getProductByID, getProducts, updateProduct } from "../controllers/product.js";

const router = express.Router();


// @Method - get 
// @route - /api/products/get
// @desc - /to get all products

router.get("/get", getProducts); 

// @method -post
//@route- api/products/get
//@desc - api/products/get


router.post("/add", addProduct);



// @method -get
//@route- api/products/:id
//@desc - get single product
router.get("/:id", getProductByID)


// @method - delete
//@route- api/products/:id
//@desc - to delete product
router.delete("/:id", deleteProduct);


// @method - delete
//@route- api/products/:id
//@desc - to edit/update product
router.put("/:id", updateProduct);

export default router;