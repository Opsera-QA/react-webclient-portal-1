import React from "react";
import {useHistory} from "react-router-dom";
import useLocationReference from "hooks/useLocationReference";

export default function OpseraHeaderIcon() {
  const { currentPath } = useLocationReference();
  const history = useHistory();
  const getOpseraIcon = () => {
    return (
      <img
        alt={"Opsera Inc."}
        src={"/img/logos/opsera_logo_white_horizontal_240_42.png"}
        width={"216"}
        height={"38"}
        className={"d-inline-block align-top"}
      />
    );
  };

  const handleLogoClick = () => {
    history.push(`/`);
  };

  return (
    <div
      onClick={currentPath !== "/" ? handleLogoClick : undefined}
      className={currentPath !== "/" ? "pointer" : undefined}
    >
      {getOpseraIcon()}
    </div>
  );
}
