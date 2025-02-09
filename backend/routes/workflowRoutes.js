const express = require('express');
const router = express.Router();
const workflowController = require('../controllers/workflowController');

router.post('/create', workflowController.createWorkflow);

// ✅ New route to get all workflows
router.get('/all', workflowController.getAllWorkflows);

module.exports = router;
