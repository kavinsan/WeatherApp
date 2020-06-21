import React from "react";
import "./styles.css";

const InfoLabel = (props) => {
  const { title, value } = props;

  return (
    <label className="infoLabel">
      {title && title}
      <span className="infoValue">{value}</span>
    </label>
  );
};

export default InfoLabel;
