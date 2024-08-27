import React, { useCallback } from "react";
import CustomHandle from "../components/CustomHandle";
import { Position, useReactFlow } from "@xyflow/react";

function EndNode({ id }) {
  const { setNodes } = useReactFlow();

  const handleDeleteNode = useCallback(() => {
    setNodes((prevNodes) => {
      return prevNodes.filter((node) => node.id !== id);
    });
  }, [id, setNodes]);

  return (
    <div className="bg-red-500 rounded-md px-8 py-4 relative">
      <CustomHandle type="target" position={Position.Top} />

      <div className="text-white font-bold">END</div>
      <div
        className="text-red-600 bg-white font-semibold border border-white w-5 h-5 grid cursor-pointer place-content-center p-1 rounded-full hover:bg-red-200 hover:text-black absolute top-1 right-1"
        onClick={handleDeleteNode}
      >
        ✕
      </div>
    </div>
  );
}

export default EndNode;
