import React from "react";

function Subjective({ onClick }) {
  return (
    <div
      className="flex flex-col gap-4 bg-yellow-50 rounded-md border border-black"
      onClick={onClick}
    >
      <div className="bg-green-500 p-1 rounded-t-md text-center font-semibold text-lg">
        Send a Message
      </div>
      <div className="p-1">
        Any message that you want to display to your client comes here. Add
        text, document, image, audio, video, etc.
      </div>
      {/* <div className="flex gap-2">
        <div>Text</div>
        <div>Image</div>
        <div>Document</div>
        <div>Audio</div>
        <div>Video</div>
      </div> */}
    </div>
  );
}

export default Subjective;
