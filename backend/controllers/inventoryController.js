const inventoryService = require('../services/inventoryService');

// 🔹 Add new inventory item
const addInventory = async (req, res) => {
    try {
        const { name, quantity } = req.body;

        if (!name || quantity == null) {
            return res.status(400).json({ error: "Name and quantity are required." });
        }

        const inventoryItem = await inventoryService.addInventory(name, quantity);
        res.status(201).json({ message: "Item added successfully", data: inventoryItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 🔹 Get all inventory items
const getAllInventory = async (req, res) => {
    try {
        const inventoryItems = await inventoryService.getAllInventory();
        res.status(200).json(inventoryItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 🔹 Update inventory item
const updateInventory = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        if (!id || quantity == null) {
            return res.status(400).json({ error: "ID and quantity are required." });
        }

        const updatedItem = await inventoryService.updateInventory(id, quantity);
        res.status(200).json({ message: "Item updated successfully", data: updatedItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { addInventory, getAllInventory, updateInventory };
