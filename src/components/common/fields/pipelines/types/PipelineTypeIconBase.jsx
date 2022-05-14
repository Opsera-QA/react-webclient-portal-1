import React from "react";
import PropTypes from "prop-types";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import {faBracketsCurly, faDraftingCompass, faMicrochip} from "@fortawesome/pro-light-svg-icons";
import {faSalesforce} from "@fortawesome/free-brands-svg-icons";
import IconBase from "components/common/icons/IconBase";

function PipelineTypeIconBase(
  {
    type,
    className,
  }) {
  const getTooltipText = () => {
    switch (type) {
      case "sfdc":
        return ("Salesforce");
      case "ai-ml":
        return ("Machine Learning (AI)");
      case "sdlc":
        return ("Software Development");
      default:
        return ("No Pipeline Type Assigned");
    }
  };

  const getTypeIcon = () => {
    switch (type) {
      case "sfdc":
        return (faSalesforce);
      case "ai-ml":
        return (faMicrochip);
      case "sdlc":
        return (faBracketsCurly);
      default:
        return (faDraftingCompass);
    }
  };

  return (
    <TooltipWrapper innerText={getTooltipText()}>
      <div>
        <IconBase
          icon={getTypeIcon()}
          className={className}
          iconSize={"lg"}
        />
      </div>
    </TooltipWrapper>
  );
}

PipelineTypeIconBase.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
};

export default PipelineTypeIconBase;