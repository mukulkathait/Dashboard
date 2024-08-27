import React from "react";
import {
  BezierEdge,
  EdgeLabelRenderer,
  getBezierPath,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

export default function CustomEdge(props) {
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  } = props;

  const { setEdges } = useReactFlow();

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  const handleEdgeDelete = () => {
    setEdges((prevEdges) => {
      const newEdges = prevEdges.filter((edge) => edge.id !== id);
      return newEdges;
    });
  };

  return (
    <>
      <BezierEdge {...props} />
      <EdgeLabelRenderer>
        <div
          aria-label="Delete Edge"
          className="text-red-600 absolute cursor-pointer bg-transparent font-bold"
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
          }}
          onClick={handleEdgeDelete}
        >
          X
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
