const workflowService = require('../services/workflowService');

// Create Workflow (Already exists)
const createWorkflow = async (req, res) => {
    try {
        const { created_by, flow1, flow2, flow3, flow4 } = req.body;

        const workflow = await workflowService.createWorkflow(created_by, flow1, flow2, flow3, flow4);

        res.status(201).json({ message: "Workflow created successfully", data: workflow });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Get All Workflows
const getAllWorkflows = async (req, res) => {
    try {
        const workflows = await workflowService.getAllWorkflows();
        res.status(200).json({ data: workflows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createWorkflow, getAllWorkflows };
