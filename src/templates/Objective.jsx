import React from "react";
import Options from "../components/Options";

function Objective({ onClick }) {
  return (
    <div
      className="flex flex-col gap-4 bg-yellow-50 rounded-md border border-black"
      onClick={onClick}
    >
      <div className="bg-green-500 p-1 rounded-t-md text-center font-semibold text-lg">
        Question
      </div>
      <div className="flex flex-col gap-2 p-2">
        <div className="text-wrap font-medium">
          Enter any question you want to ask here .....
        </div>
        <Options textInput={"Option 1"} />
        <Options textInput={"Option 2"} />
      </div>
    </div>
  );
}

export default Objective;
