import React from "react";

function TemplateWrapper({ children }) {
  return (
    <div className="rounded-md transition ease-in-out hover:-translate-y-1 hover:scale-105 duration-300">
      {children}
    </div>
  );
}

export default TemplateWrapper;
