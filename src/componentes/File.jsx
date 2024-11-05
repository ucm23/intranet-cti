import React from "react";

const File = ({ file }) => {
  return (
    <div style={{ marginLeft: "20px" }}>
      📄 {file.name}
    </div>
  );
};

export default File;
