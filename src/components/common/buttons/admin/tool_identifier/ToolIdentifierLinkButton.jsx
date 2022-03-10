import React from "react";
import PropTypes from "prop-types";
import {faTools} from "@fortawesome/pro-light-svg-icons";
import Button from "react-bootstrap/Button";
import {useHistory} from "react-router-dom";
import IconBase from "components/common/icons/IconBase";

function ToolIdentifierLinkButton({toolIdentifierId, openInNewWindow, className, variant, closePanel}) {
  let history = useHistory();

  const loadTool = () => {
    if (openInNewWindow) {
      window.open(`/admin/tools/identifiers/details/${toolIdentifierId}`);
    }
    else {
      history.push(`/admin/tools/identifiers/details/${toolIdentifierId}`);

      if (closePanel) {
        closePanel();
      }
    }
  };

  return (
    <Button onClick={() => loadTool()} className={className ? className : "mb-2 small"} size={"sm"} variant={variant}>
      <span className="my-auto"><IconBase icon={faTools} className={"pr-1"}/>View</span>
    </Button>
  );
}

ToolIdentifierLinkButton.propTypes = {
  toolIdentifierId: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.string,
  openInNewWindow: PropTypes.bool,
  closePanel: PropTypes.func
};

export default ToolIdentifierLinkButton;
