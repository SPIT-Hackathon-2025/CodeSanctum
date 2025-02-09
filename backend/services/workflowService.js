const { supabase } = require('../config/config');

// Create Workflow (Already exists)
const createWorkflow = async (created_by, flow1, flow2, flow3, flow4) => {
    const created_at = new Date().toISOString(); // Current timestamp

    const { data, error } = await supabase
        .from('workflow') // Your table name in Supabase
        .insert([{ created_by, created_at, flow1, flow2, flow3, flow4 }])
        .select();

    if (error) throw new Error(error.message);

    return data[0];
};

// ✅ Get All Workflows
const getAllWorkflows = async () => {
    const { data, error } = await supabase
        .from('workflow')
        .select('*'); // Fetch all rows

    if (error) throw new Error(error.message);

    return data; // Return all workflows
};

module.exports = { createWorkflow, getAllWorkflows };
