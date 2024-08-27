import Init from "./templates/Init";
import Subjective from "./templates/Subjective";
import Objective from "./templates/Objective";
import Exit from "./templates/Exit";
import TemplateWrapper from "./components/TemplateWrapper";
import {
  Background,
  BackgroundVariant,
  MiniMap,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  Controls,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import MessageNode from "./customNodes/MessageNode";
import QuestionNode from "./customNodes/QuestionNode";
import StartNode from "./customNodes/StartNode";
import EndNode from "./customNodes/EndNode";
import CustomEdge from "./components/CustomEdge";
import { useCallback, useEffect, useState } from "react";

function generateUniqueId() {
  return `node-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

const nodeTypes = {
  messageNode: MessageNode,
  questionNode: QuestionNode,
  startNode: StartNode,
  endNode: EndNode,
};

const edgeTypes = {
  customEdge: CustomEdge,
};

function nodeColor(node) {
  switch (node.type) {
    case "startNode":
      return "#1ed6d3";
    case "messageNode":
      return "#6ede87";
    case "questionNode":
      return "#6865A5";
    case "endNode":
      return "#c95a3c";
    default:
      return "#ff0072";
  }
}

const initialNodes = [
  {
    id: generateUniqueId(),
    position: { x: 50, y: 50 },
    type: "startNode",
    data: {},
  },
];

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [error, setError] = useState(false);

  const xCoordinates = Math.random() * 800;
  const yCoordinates = Math.random() * 600;

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  }, [error]);

  const onClickHandler = (nodeType) => {
    const newNode = {
      id: generateUniqueId(),
      position: { x: xCoordinates, y: yCoordinates },
      type: nodeType,
      data: { id: generateUniqueId() },
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
    console.log("Nodes Array : ", nodes);
  };

  const onConnect = useCallback(
    (connection) => {
      const edge = {
        ...connection,
        animated: true,
        id: generateUniqueId(),
        type: "customEdge",
      };
      setEdges((prevEdges) => addEdge(edge, prevEdges));
      console.log("Edges Array : ", edges);
    },
    [edges]
  );

  return (
    <>
      <div className="flex h-screen">
        <div className="flex flex-col gap-4 flex-none w-1/5 h-inherit bg-amber-200 border-r-2 border-black p-4">
          <div className="w-full text-2xl text-center font-bold text-slate-700">
            Templates
          </div>
          {/* <TemplateWrapper> */}
          <Init
            onClick={() => {
              setError(true);
            }}
          />
          {/* </TemplateWrapper> */}
          <TemplateWrapper>
            <Subjective onClick={() => onClickHandler("messageNode")} />
          </TemplateWrapper>
          <TemplateWrapper>
            <Objective onClick={() => onClickHandler("questionNode")} />
          </TemplateWrapper>
          <TemplateWrapper>
            <Exit onClick={() => onClickHandler("endNode")} />
          </TemplateWrapper>
        </div>
        <div className="flex flex-col grow h-full bg-slate-200 p-4">
          <ReactFlowProvider className=" relative flex flex-col grow">
            <div className="flex justify-end items-center pr-4 mb-2">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Save
              </button>
            </div>
            {error && (
              <div className="bg-red-500 text-white rounded-full w-fit h-fit px-3 py-1 absolute">
                <b>WARNING : </b> Only 1 Start Node is allowed.
              </div>
            )}
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              onConnect={onConnect}
              className="grow"
            >
              <Background color="black" variant={BackgroundVariant.Dots} />
              <MiniMap nodeColor={nodeColor} />
              <Controls />
            </ReactFlow>
          </ReactFlowProvider>
        </div>
      </div>
    </>
  );
}

export default App;
