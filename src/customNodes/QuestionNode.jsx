import React, { useCallback, useState } from "react";
import Options from "../components/Options";
import CustomHandle from "../components/CustomHandle";
import { Position, useReactFlow } from "@xyflow/react";

function QuestionNode({ id }) {
  const [question, setQuestion] = useState(
    "Enter any question you want to ask here ....."
  );
  const [isEditingQuestion, setIsEditingQuestion] = useState(false);
  const [options, setOptions] = useState(["Option 1", "Option 2"]);

  const handleQuestionEdit = () => {
    setIsEditingQuestion(true);
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleQuestionKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditingQuestion(false);
    }
  };

  const handleOptionChange = (index, newValue) => {
    const newOptions = options.map((option, i) =>
      i === index ? newValue : option
    );
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, `Option ${options.length + 1}`]);
  };

  const removeOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
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
        <div className="bg-green-300 p-1 rounded-t-md flex justify-between">
          <div>Question</div>
          <div
            className="text-red-600 font-semibold border w-5 h-5 grid place-content-center p-1 rounded-full hover:bg-red-600 hover:text-white cursor-pointer"
            onClick={handleDeleteNode}
          >
            ✕
          </div>
        </div>
        {/* Editable Question */}
        <div className="flex flex-col gap-2 px-2 pb-2">
          {isEditingQuestion ? (
            <input
              className="text-wrap w-full p-1 border border-gray-300 rounded-md"
              type="text"
              value={question}
              onChange={handleQuestionChange}
              onKeyDown={handleQuestionKeyDown}
              autoFocus
            />
          ) : (
            <div
              className="text-wrap font-medium cursor-pointer"
              onClick={handleQuestionEdit}
            >
              {question}
            </div>
          )}

          {/* Editable Options */}
          {options.map((option, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                className="text-wrap w-full p-1 border border-gray-300 rounded-md"
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
              <button
                onClick={() => removeOption(index)}
                className="text-red-500 ml-2"
              >
                ✕
              </button>
            </div>
          ))}

          {/* Add Option Button */}
          <button
            onClick={addOption}
            className="bg-blue-500 text-white p-1 rounded-md mt-2"
          >
            Add Option
          </button>
        </div>
      </div>
      <CustomHandle type="source" position={Position.Bottom} />
    </div>
  );
}

export default QuestionNode;
