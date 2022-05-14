import React from "react";
import PropTypes from "prop-types";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import {faBracketsCurly, faDraftingCompass, faMicrochip} from "@fortawesome/pro-light-svg-icons";
import {faSalesforce} from "@fortawesome/free-brands-svg-icons";
import IconBase from "components/common/icons/IconBase";

function PipelineTypeIcon({ fieldName, model }) {
  const getTooltipText = () => {
    const type = model?.getArrayData(fieldName);

    if (!Array.isArray(type) || type.length === 0) {
      return "No Pipeline Type Assigned";
    }

    switch (type[0]) {
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
    const type = model?.getArrayData(fieldName);

    if (!Array.isArray(type) || type.length === 0) {
      return "No Pipeline Type Assigned";
    }

    switch (type[0]) {
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

  if (model == null) {
    return null;
  }

  return (
    <TooltipWrapper innerText={getTooltipText()}>
      <IconBase icon={getTypeIcon()} className={"mr-2 pipeline-text"} iconSize={"lg"}/>
    </TooltipWrapper>
  );
}

PipelineTypeIcon.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
};

PipelineTypeIcon.defaultProps = {
  fieldName: "type"
};

export default PipelineTypeIcon;