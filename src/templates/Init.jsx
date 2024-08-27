import React from "react";

function Init({ onClick }) {
  return (
    <div
      className="flex flex-col gap-4 bg-yellow-50 rounded-md border border-black"
      onClick={onClick}
    >
      <div className="bg-cyan-500 p-1 rounded-t-md text-center font-semibold text-lg">
        Start
      </div>
      <div className="p-1">Application must contain only one Start Node.</div>
    </div>
  );
}

export default Init;
