import React from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExternalLink, faLock} from "@fortawesome/pro-light-svg-icons";
import {useHistory} from "react-router-dom";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

function ToolLinkIcon({toolId, isLoading, accessAllowed, loadToolInNewWindow, className, handleClose}) {
  let history = useHistory();

  const loadTool = () => {
    if (loadToolInNewWindow) {
      window.open(`/inventory/tools/details/${toolId}`);
    }
    else {
      history.push(`/inventory/tools/details/${toolId}`);

      if (handleClose) {
        handleClose();
      }
    }
  };

  const getIcon = () => {
    if (isLoading) {
      return null;
    }

    if (accessAllowed !== true) {
      return (
        <TooltipWrapper trigger={["hover", "focus"]} innerText={"You do not have access to this Tool"}>
          <span className="my-auto danger-red">
            <FontAwesomeIcon icon={faLock} fixedWidth/>
          </span>
        </TooltipWrapper>
      );
    }

    return (
      <TooltipWrapper trigger={["hover", "focus"]} innerText={"Go To Tool's Detail View"}>
        <span onClick={() => loadTool()} className={"pointer my-auto"}>
          <FontAwesomeIcon icon={faExternalLink} fixedWidth/>
        </span>
      </TooltipWrapper>
    );
  };

  if (toolId == null) {
    return null;
  }

  return (
    <span className={className}>
      {getIcon()}
    </span>
  );
}

ToolLinkIcon.propTypes = {
  toolId: PropTypes.string,
  accessAllowed: PropTypes.bool,
  className: PropTypes.string,
  loadToolInNewWindow: PropTypes.bool,
  handleClose: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default ToolLinkIcon;
