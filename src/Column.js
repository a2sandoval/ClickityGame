import React from "react";

const Column = props => {
  const size = props.size.split(" ").map(size => "col-" + size).join(" ");
  return (
    <div key={size.id}className={size}>
      {props.children}
    </div>
  );
};

export default Column;