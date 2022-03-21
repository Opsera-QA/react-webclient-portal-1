import React from "react";
import PropTypes from "prop-types";
import {faFileSearch} from "@fortawesome/pro-light-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import IconBase from "components/common/icons/IconBase";

function ToggleViewDetailsIcon({ activeTab, setActiveTab, className, visible }) {
  const toggleViewDetails = () => {
    setActiveTab("viewDetails");
  };

  if (!setActiveTab || activeTab === "viewDetails" || visible === false) {
    return null;
  }

  return (
    <div className={className}>
      <TooltipWrapper innerText={"Toggle View Details"}>
        <IconBase
          onClickFunction={() => {toggleViewDetails();}}
          icon={faFileSearch}
          className={"pointer"}
        />
      </TooltipWrapper>
    </div>
  );
}

ToggleViewDetailsIcon.propTypes = {
  setActiveTab: PropTypes.func,
  activeTab: PropTypes.string,
  className: PropTypes.string,
  visible: PropTypes.bool
};

export default ToggleViewDetailsIcon;