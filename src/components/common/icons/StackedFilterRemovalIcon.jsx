import React from "react";
import {faFilter, faTimes} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";

function StackedFilterRemovalIcon() {
  return (
    <span className="fa-layers fa-fw">
      <IconBase icon={faFilter}/>
      <IconBase icon={faTimes} iconTransformProperties={"right-9 down-5 shrink-4"} />
    </span>
  );
}

export default StackedFilterRemovalIcon;