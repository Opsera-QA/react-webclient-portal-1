import React from "react";
import PropTypes from "prop-types";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBracketsCurly, faDiceD20, faMicrochip} from "@fortawesome/pro-light-svg-icons";
import {faSalesforce} from "@fortawesome/free-brands-svg-icons";

// TODO: This will eventually show all category types, but for now just show the first
function PipelineTypesField({ fieldName, dataObject }) {
  const getTooltipText = () => {
    let type = dataObject.getData(fieldName);
    if (!type) {
      return "No Pipeline Type Assigned";
    }

    switch (type[0]) {
      case "sfdc":
        return ("SalesForce");
      case "ai-ml":
        return ("Machine Learning (AI)");
      case "sdlc":
        return ("Software Development");
      default:
        return ("No Pipeline Type Assigned");
    }
  };

  const getTypeIcon = () => {
    let type = dataObject.getData(fieldName);

    if (!type) {
      return faDiceD20;
    }

    switch (type[0]) {
      case "sfdc":
        return (faSalesforce);
      case "ai-ml":
        return (faMicrochip);
      case "sdlc":
        return (faBracketsCurly);
      default:
        return (faDiceD20);
    }
  };

  return (
    <TooltipWrapper innerText={getTooltipText()}>
      <FontAwesomeIcon icon={getTypeIcon()} className="ml-1 pipeline-blue-text" size="lg"/>
    </TooltipWrapper>
  );
}

PipelineTypesField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
};

PipelineTypesField.defaultProps = {
  fieldName: "type"
};

export default PipelineTypesField;