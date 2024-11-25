"use client";
import React , {useState, useEffect } from "react";
import axios from 'axios';
import ImageNode from "./ImageNode";

export default function Sidebar({
  nodeName,
  setNodeName,
  selectedNode,
  setImageURLNode,
  setSelectedElements,
  updateNodeData
}) {

const [imageURL, setImageURL] = useState('');

  

  const handleInputChange = (event) => {
    setNodeName(event.target.value);
  };
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  
  // Handle the image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
        reader.onloadend = () => {
        setImageURL(reader.result); 
        setImageURLNode(reader.result)
        console.log("reader===", reader.result);
        
      };
      reader.readAsDataURL(file);
    }

    // setImageURLNode()

  };
  

  useEffect(() => {
    console.log("imageUrl", imageURL);
    
    if (updateNodeData) {
      updateNodeData(selectedNode.id, { imageUrl: imageURL });
    }
  }, []);




  
  return (
    <aside className="border-r-2 border-blue-200 p-4 text-sm bg-blue-100 w-64 h-screen text-black">
      {selectedNode ? (
        //settings panel
        <div>
          <h3 className="text-xl mb-2 text-blue-900">Update Node</h3>
          <label className="block mb-2 text-sm font-medium text-blue-900">
            Node Name:
          </label>

          <input
            type="text"
            className="block w-full pt-2 px-3 pb-3 text-gray-700 border border-blue-300 rounded-lg bg-white focus:outline-none focus:border-blue-500"
            value={nodeName}
            onChange={handleInputChange}
          />
      

    <div>
      {imageURL && (
        <div>
          <h2>Preview</h2>
          <img src={imageURL} alt="preview" style={{ maxWidth: '200px' }} />
        </div>
      )}
    </div>
    
    
      <input
            type="file"
            accept="image/*"
            className="mt-4"
            onChange={handleImageUpload}
          />
          <button
            className="mt-4 bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
            onClick={() => setSelectedElements([])}
          >
            Go Back
          </button>
        </div>
      ) : (
        //node panel
        <>
          <h3 className="text-xl mb-4 text-blue-900">Nodes Panel</h3>
          <div
            className="bg-white p-3 border-2 border-blue-500 rounded cursor-move flex justify-center items-center text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200"
            onDragStart={(event) => onDragStart(event, "textnode")}
            draggable
          >
            Message Node
          </div>
          <div
            className="bg-white p-3 my-4 border-2 border-blue-500 rounded cursor-move flex justify-center items-center text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200"
            onDragStart={(event) => onDragStart(event, "imagenode")}
            draggable
          >
            Image Node
          </div>
        </>
      )}
    </aside>
  );
}
