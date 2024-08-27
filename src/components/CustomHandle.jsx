import React from "react";
import { Handle } from "@xyflow/react";

export default function CustomHandle(props) {
  return (
    <Handle
      className="w-2 h-2 bg-white border-2 border-solid border-black"
      {...props}
    />
  );
}
