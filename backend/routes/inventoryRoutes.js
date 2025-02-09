const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.post('/add', inventoryController.addInventory);   // Add inventory
router.get('/all', inventoryController.getAllInventory); // Get all inventory
router.put('/update/:id', inventoryController.updateInventory); // Update inventory

module.exports = router;
