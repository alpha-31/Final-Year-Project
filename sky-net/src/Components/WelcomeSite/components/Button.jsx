import React from "react";
import "../styles/components/Button.scss";

export default function Button({ content, icon = "", color = "blue", onClick  }) {
  return (
    <button className={`${color}`} onClick ={onClick}>
      {content} {icon} 
    </button>
  );
}
