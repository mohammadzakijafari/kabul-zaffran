const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");
const upload = require("../middleware/multer");

const { getAllProducts, getSingleProduct, createProduct, updateProduct, deleteProduct } = require("../controllers/product");

router.get("/products", getAllProducts);
router.get("/products/:id", getSingleProduct);
router.post("/products/create", upload.fields([{name: 'image1', maxCount: 1}, {name: 'image2', maxCount: 1}, {name: 'image3', maxCount: 1}, {name: 'image4', maxCount: 1}]) , createProduct);
router.put("/products/update/:id", adminAuth, updateProduct);
router.delete("/products/delete/:id", adminAuth, deleteProduct);

module.exports = router;