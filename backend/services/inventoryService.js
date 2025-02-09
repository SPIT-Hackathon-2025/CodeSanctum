const { supabase } = require('../config/config');

// 🔹 Add new inventory item
const addInventory = async (name, quantity) => {
    const { data, error } = await supabase
        .from('inventory') // Replace with your table name
        .insert([{ name, quantity }])
        .select();

    if (error) throw new Error(error.message);
    return data[0];
};

// 🔹 Get all inventory items
const getAllInventory = async () => {
    const { data, error } = await supabase
        .from('inventory')
        .select('*');

    if (error) throw new Error(error.message);
    return data;
};

// 🔹 Update inventory item
const updateInventory = async (id, quantity) => {
    const { data, error } = await supabase
        .from('inventory')
        .update({ quantity })
        .eq('id', id)
        .select();

    if (error) throw new Error(error.message);
    return data[0];
};

module.exports = { addInventory, getAllInventory, updateInventory };
