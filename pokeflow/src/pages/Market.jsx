import React, { useEffect, useState } from "react";
import {
    ReactFlow,
    Controls,
    Background,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import Sidebar from "../components/sidebar/sidebar";
import { fetchEmails, downloadAttachment, uploadToDrive, writeToSheet, addEventToCalendar } from '../components/GoogleApi';
const WorkflowDiagram = () => {
    const [token, setToken] = useState(null);
      const [waitingForAttachment, setWaitingForAttachment] = useState(false);
    
      useEffect(() => {
        const storedToken = localStorage.getItem("google_access_token");
        if (storedToken) {
          setToken(storedToken);
          console.log("Google Access Token:", storedToken);
        }
      }, []);
    
      const checkForNewEmails = async () => {
        if (!token) {
          alert("Please authenticate with Google first.");
          return;
        }
    
        let hasAttachments = false;
    
        while (!hasAttachments) {
          console.log("Checking for new emails...");
          const emails = await fetchEmails(token);
    
          const emailWithAttachment = emails.find(email => email.attachments?.length > 0);
    
          if (emailWithAttachment) {
            hasAttachments = true;
            console.log("Attachment found! Downloading...");
            let emailText = emailWithAttachment.body || "No text available";
            let emailSubject = emailWithAttachment.subject || "No Subject";
            let emailDate = new Date(emailWithAttachment.date);
    
            for (const attachment of emailWithAttachment.attachments) {
              const fileData = await downloadAttachment(token, emailWithAttachment.id, attachment.id, attachment.filename);
    
              console.log("Uploading to Drive...");
              const driveFileId = await uploadToDrive(token, attachment.filename, fileData);
              console.log(`File uploaded to Drive: ${driveFileId}`);
    
              if (attachment.filename.endsWith('.txt')) {
                const textContent = new TextDecoder().decode(fileData);
                console.log("Saving text to Google Sheets...");
                await writeToSheet(token, [[attachment.filename, textContent]]);
              }
            }
    
            console.log("Saving email content to Google Sheets...");
            await writeToSheet(token, [[emailWithAttachment.subject || "No Subject", emailText]]);
            console.log("Adding event to Google Calendar...");
            await addEventToCalendar(token, emailSubject, emailDate);
    
            alert("Attachment processed successfully!");
            setWaitingForAttachment(false);
          } else {
            console.log("No attachments yet, waiting...");
            await new Promise(resolve => setTimeout(resolve, 5000)); 
          }
        }
      };
    
      const handleMailClick = () => {
        setWaitingForAttachment(true);
        checkForNewEmails();
      };
    const [workflows, setWorkflows] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch workflows from the backend
    useEffect(() => {
        const fetchWorkflows = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/workflows/all");
                const data = await response.json();
                setWorkflows(data.data);
            } catch (error) {
                console.error("Error fetching workflows:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkflows();
    }, []);

    // Generate nodes and edges dynamically
    const generateFlowData = () => {
        const nodes = [];
        const edges = [];
        let yOffset = 0;

        workflows.forEach((workflow) => {
            const { id, flow1, flow2, flow3, flow4 } = workflow;
            const nodeIds = [];
            const flows = [flow1, flow2, flow3, flow4].filter(Boolean);

            flows.forEach((flow, idx) => {
                const nodeId = `${id}-${idx}`;
                nodeIds.push(nodeId);

                nodes.push({
                    id: nodeId,
                    data: { label: flow },
                    position: { x: idx * 150, y: yOffset },
                    style: { background: "#6b4e2f", color: "white", padding: 10, borderRadius: 8 },
                });

                if (idx > 0) {
                    edges.push({ id: `e${nodeIds[idx - 1]}-${nodeId}`, source: nodeIds[idx - 1], target: nodeId });
                }
            });

            // Add button node at the end of each workflow
            if (flows.length > 0) {
                const buttonNodeId = `${id}-button`;
                nodes.push({
                    id: buttonNodeId,
                    data: {
                        label: (
                            <button
                            onClick={handleMailClick}
                                style={{
                                    padding: "5px 10px",
                                    borderRadius: "5px",
                                    background: "#4CAF50",
                                    color: "white",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                            >
                                Complete Flow
                            </button>
                        ),
                    },
                    position: { x: flows.length * 150, y: yOffset },
                    style: { background: "transparent", border: "none" },
                });

                edges.push({
                    id: `e${nodeIds[nodeIds.length - 1]}-${buttonNodeId}`,
                    source: nodeIds[nodeIds.length - 1],
                    target: buttonNodeId,
                });
            }

            yOffset += 150;
        });

        return { nodes, edges };
    };

    const { nodes, edges } = generateFlowData();

    return (
        <div className="w-[100vw] h-[100vh] flex gap-0 items-center">
            <Sidebar />
            <div className="body w-[80%] h-[100vh] bg-black px-20 py-10">
                <div className="w-[100%] font-bold mb-10 flex justify-start items-center text-3xl text-[#F1E0C6]">
                    Market Place
                </div>
                <div className="mail w-[100%] mb-10 flex justify-end items-center pt-5">
                    <div style={{ height: "80vh", width: "100%" }}>
                        {loading ? (
                            <p className="text-white text-center">Loading workflows...</p>
                        ) : (
                            <ReactFlow nodes={nodes} edges={edges}>
                                <Background />
                                <Controls />
                            </ReactFlow>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkflowDiagram;
