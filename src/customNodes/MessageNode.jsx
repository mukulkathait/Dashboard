import { Position, useReactFlow } from "@xyflow/react";
import React, { useCallback, useState } from "react";
import CustomHandle from "../components/CustomHandle";

function MessageNode({ id }) {
  const [message, setMessage] = useState("Enter your custom message here");
  const [isEditing, setIsEditing] = useState(false);
  const [uploadedContent, setUploadedContent] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const fileDetails = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setUploadedContent([...uploadedContent, ...fileDetails]);
    setShowMenu(false);
  };

  const handleDelete = (index) => {
    setUploadedContent(uploadedContent.filter((_, i) => i !== index));
  };

  const { setNodes } = useReactFlow();

  const handleDeleteNode = useCallback(() => {
    setNodes((prevNodes) => {
      return prevNodes.filter((node) => node.id !== id);
    });
  }, [id, setNodes]);

  return (
    <div className="w-64">
      <CustomHandle type="target" position={Position.Top} />
      <div className="flex flex-col gap-4 bg-yellow-50 rounded-md">
        <div className="bg-green-300 p-2 rounded-t-md flex justify-between cursor-pointer">
          <div>Send a Message</div>
          <div
            className="text-red-600 font-semibold border w-5 h-5 grid place-content-center p-1 rounded-full hover:bg-red-600 hover:text-white"
            onClick={handleDeleteNode}
          >
            ✕
          </div>
        </div>

        <div className="w-full max-h-32 overflow-auto p-2 border border-gray-300 rounded-md">
          {isEditing ? (
            <input
              className="text-wrap w-full"
              type="text"
              value={message}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              autoFocus
              style={{ height: "auto" }}
            />
          ) : (
            <div onClick={handleEdit} className="cursor-pointer break-words">
              {message}
            </div>
          )}

          {/* Display Uploaded Content */}
          {uploadedContent.length > 0 &&
            uploadedContent.map((content, index) => (
              <div
                key={index}
                className="flex items-center justify-between mt-2"
              >
                {content.url.match(/\.(jpeg|jpg|png|gif)$/) ? (
                  <img
                    src={content.url}
                    alt={`Uploaded ${index}`}
                    className="w-full max-h-32 object-contain"
                  />
                ) : (
                  <a
                    href={content.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {content.name}
                  </a>
                )}
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-500 ml-2"
                >
                  ✕
                </button>
              </div>
            ))}
        </div>

        {/* "+" Button to add content */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="bg-blue-500 text-white p-1 rounded-md mt-2"
        >
          +
        </button>

        {/* Menu for selecting content type */}
        {showMenu && (
          <div className="absolute bg-white border p-2 rounded-md shadow-md mt-1">
            <label className="block cursor-pointer">
              <span className="text-gray-700">Upload Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            <label className="block cursor-pointer mt-2">
              <span className="text-gray-700">Upload Document</span>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        )}
      </div>
      <CustomHandle type="source" position={Position.Bottom} />
    </div>
  );
}

export default MessageNode;
