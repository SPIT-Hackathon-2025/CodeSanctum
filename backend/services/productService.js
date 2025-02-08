const { supabase } = require('../config/config');

// Add Product
const addProduct = async (product) => {
  try {
    console.log("🔹 API Request Payload:", JSON.stringify(product, null, 2));

    const { data, error } = await supabase
      .from('product')
      .insert([product])
      .select('*');

    if (error) {
      console.error("❌ Supabase Insert Error:", JSON.stringify(error, null, 2));
      throw new Error(error.message || "Unknown Supabase error");
    }

    console.log("✅ Product Inserted Successfully:", data);
    return data;
  } catch (err) {
    console.error("❌ Unexpected Error in addProduct:", err);
    throw err;
  }
};

// Update Product
const updateProduct = async (product_id, updatedFields) => {
  const { data, error } = await supabase
    .from('Product')
    .update(updatedFields)
    .eq('product_id', product_id)
    .select('*');
  
  if (error) throw error;
  return data;
};

// Delete Product
const deleteProduct = async (product_id) => {
  const { error } = await supabase.from('Product').delete().eq('product_id', product_id);
  if (error) throw error;
};

module.exports = { addProduct, updateProduct, deleteProduct };
