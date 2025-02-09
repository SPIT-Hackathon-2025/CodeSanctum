import React, { useEffect, useState } from "react";
import Tesseract from "tesseract.js";
import moment from "moment"; 
import axios from "axios";
import { toast } from "react-hot-toast";
import './ocr.css'


const OCRScanner = () => {
  const [image, setImage] = useState(null);
  const [parsedData, setParsedData] = useState({});
  const [rawText, setRawText] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const itemsNotInclude = [
    "total",
    "sub total",
    "cgst",
    "sgst",
    "st",
    "@",
    "discount",
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScan = async () => {
    if (!image) {
      alert("Please upload an image first!");
      return;
    }

    setLoading(true);
    Tesseract.recognize(image, "eng", {})
      .then(({ data: { text } }) => {
        setRawText(text); // Save raw OCR output
        const extractedData = extractBillDetails(text);
        console.log("Extracted data:", extractedData);
        setParsedData(extractedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const extractBillDetails = (text) => {
    const lines = text.split("\n");
    const result = {
      seller: "",
      date: "",
      items: [],
      total: 0, 
    };

    
    if (lines.length > 0) result.seller = lines[0];

   
    const dateRegex =
      /\b(\d{1,2}[-\/]\d{1,2}[-\/]\d{2,4}|[A-Za-z]{3,9} \d{1,2}, \d{4})\b/;
    const dateMatch = text.match(dateRegex);
    if (dateMatch) {
      const rawDate = dateMatch[0];
      if (isValidDate(rawDate)) {
        result.date = formatDate(rawDate);
      } else {
        console.warn("Date found but invalid:", rawDate);
      }
    }

    
    const itemRegex = /(.+?)\s+(\d+)\s+([\d.,]+)/; 
    lines.forEach((line) => {
      const match = line.match(itemRegex);
      if (match) {
        const itemName = match[1].trim().toLowerCase();
        const quantity = match[2];
        const price = parseFloat(match[3].replace(/,/g, "")) || 0; 

       
        const shouldInclude = !itemsNotInclude.some((word) =>
          itemName.includes(word)
        );

        if (shouldInclude) {
          result.items.push({
            name: match[1].trim(),
            quantity,
            price,
          });

          
          result.total += price;
        }
      }
    });

    console.log(result.items);
    return result;
  };

  const isValidDate = (dateString) => {
    
    return moment(
      dateString,
      ["MM/DD/YYYY", "DD/MM/YYYY", "DD/MM/YY", "YYYY-MM-DD", "MMMM DD, YYYY"],
      true
    ).isValid();
  };

  const formatDate = (dateString) => {
    
    return moment(dateString, [
      "MM/DD/YYYY",
      "DD/MM/YYYY",
      "YYYY-MM-DD",
      "MMMM DD, YYYY",
    ]).format("YYYY-MM-DD");
  };
  const [isChecked, setIsChecked] = useState(false);

  const handleInventoryUpdate = async () => {
    if (!parsedData.items || parsedData.items.length === 0) {
      toast.error("No items found to update in inventory!");
      return;
    }

    try {
      
      const inventoryResponse = await axios.get("http://localhost:5000/api/inventory/all");
      const inventoryItems = inventoryResponse.data;

      for (const scannedItem of parsedData.items) {
        const existingItem = inventoryItems.find(
          (invItem) => invItem.name.toLowerCase() === scannedItem.name.toLowerCase()
        );

        if (existingItem) {
         
          const updatedQuantity = existingItem.quantity + parseInt(scannedItem.quantity, 10);
          await axios.put(`http://localhost:5000/api/inventory/update/${existingItem.id}`, {
            quantity: updatedQuantity
          });

          console.log(`Updated: ${scannedItem.name} (New Quantity: ${updatedQuantity})`);
        } else {
         
          await axios.post("http://localhost:5000/api/inventory/add", {
            name: scannedItem.name,
            quantity: parseInt(scannedItem.quantity, 10)
          });

          console.log(`Added: ${scannedItem.name} (Quantity: ${scannedItem.quantity})`);
        }
      }

      toast.success("Inventory successfully updated!");
    } catch (error) {
      console.error("Error updating inventory:", error);
      toast.error("Failed to update inventory. Please try again.");
    }
  };


  return (
    <div className="p-6  max-w-4xl min-w-[35%]  mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">OCR Bill Scanner</h1>
      <div className="mb-6 flex flex-col items-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mb-4 block w-full text-sm text-gray-600 border border-gray-300 rounded px-3 py-2"
        />
        <div>
          <button
            onClick={handleScan}
            className="scan-btn"
          >
            {loading ? "Scanning..." : "Scan Bill"}
          </button>
          <button
            onClick={handleInventoryUpdate}
            className="bg-green-600 text-white px-4 py-2 rounded mt-4 hover:bg-green-700"
            disabled={!parsedData.items || parsedData.items.length === 0}
          >
            Update Inventory
          </button>
        </div>

      </div>

      <div className="flex space-x-8 h-fit">
        {/* Left side: Bill Image */}
        <div className="flex-none w-1/2">
          {image && (
            <img
              src={image}
              alt="Uploaded preview"
              className="h-[50%] max-w-md mx-auto rounded-lg"
            />
          )}
        </div>

        {/* Right side: Extracted Data */}
        <div className="flex-1 h-fit">
          {rawText && (
            <div style={{ color: "black" }}>
              <h2 className="text-2xl font-semibold mb-4">Extracted Details</h2>
              <div className="space-y-2">
                <p>
                  <strong>Seller:</strong> {parsedData.seller || "Not found"}
                </p>
                <p>
                  <strong>Date:</strong> {parsedData.date || "Not found"}
                </p>
                <p>
                  <strong>Items:</strong>
                </p>
                <ul className="list-disc pl-6 text-[14px]">
                  {parsedData.items?.map((item, index) => (
                    <li key={index}>
                      {item.name} - Qty: {item.quantity}, Price: {item.price}
                    </li>
                  ))}
                </ul>
                <p>
                  <strong>Total:</strong>{" "}
                  {parsedData.total.toFixed(2) || "Not found"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OCRScanner;