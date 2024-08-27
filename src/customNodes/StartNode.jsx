import React from "react";
import CustomHandle from "../components/CustomHandle";
import { Position } from "@xyflow/react";

function StartNode() {
  return (
    <div className="bg-cyan-500 px-8 py-4 rounded-md">
      <div className="text-black font-bold">START</div>
      <CustomHandle type="source" position={Position.Bottom} />
    </div>
  );
}

export default StartNode;
