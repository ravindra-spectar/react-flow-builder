import React from "react";
import { Handle, Position } from "reactflow";
import { FaFileImage } from "react-icons/fa";


function ImageNode({ data, selected }) {
    console.log("data-------->", data); 
    
  return (
    <div
      className={`w-40 shadow-md rounded-md bg-white ${
        selected ? "border-solid border-2 border-indigo-500/100" : ""
      }`}
    >
      <div className="flex flex-col">
        <div className="max-h-max px-2 py-1 text-left text-black text-xs font-bold rounded-t-md bg-teal-300 flex">
          <FaFileImage/> Image Node
        </div>
        <div className="px-3 py-2 flex justify-center items-center">
          {data.imageUrl ? (
            <img
              src={data.imageUrl}
              alt="Node"
              className="max-w-full max-h-20 object-cover"
            />
          ) : (
            <div className="text-xs text-gray-500 italic">No Image</div>
          )}
        </div>
      </div>

      <Handle
        id="a"
        type="target"
        position={Position.Left}
        className="w-1 rounded-full bg-slate-500"
      />
      <Handle
        id="b"
        type="source"
        position={Position.Right}
        className="w-1 rounded-full bg-gray-500"
      />
    </div>
  );
}

export default ImageNode;
