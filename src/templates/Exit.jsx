import React from "react";

function Exit({ onClick }) {
  return (
    <div
      className="flex flex-col gap-4 bg-yellow-50 rounded-md border border-black"
      onClick={onClick}
    >
      <div className="bg-red-500 p-1 rounded-t-md text-center font-semibold text-lg">
        End
      </div>
      <div className="p-1">Application can have multiple End Node.</div>
    </div>
  );
}

export default Exit;
