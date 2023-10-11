import React, { MouseEventHandler, ReactNode } from "react";

interface IPropType {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  style?: Object;
}

function DangerButton(props: IPropType) {
  return (
    <button
      style={{
        border: "none",
        padding: "0.5rem 1rem 0.5rem 1rem",
        backgroundColor: "#ad1533",
        color: "white",
        ...(props.style || {}),
      }}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default DangerButton;
