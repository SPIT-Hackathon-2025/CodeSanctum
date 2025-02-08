const productService = require('../services/productService');

// Add Product
const addProduct = async (req, res) => {
  try {
    const data = await productService.addProduct(req.body);
    res.status(201).json({ success: true, data });
  } catch (error) {
    console.error("Error adding product:", error.message || error); // Log a detailed error
    res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const { product_id } = req.params;
    const data = await productService.updateProduct(product_id, req.body);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const { product_id } = req.params;
    await productService.deleteProduct(product_id);
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { addProduct, updateProduct, deleteProduct };
