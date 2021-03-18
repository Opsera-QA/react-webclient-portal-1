import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import {useHistory} from "react-router-dom";
import IconBase from "components/common/icons/IconBase";

function ModelLinkButton({icon, size, openInNewWindow, className, variant, dataModel}) {
  let history = useHistory();

  const loadDashboard = () => {
    const link = dataModel?.getDetailViewLink();
    if (openInNewWindow) {
      window.open(link);
    }
    else {
      history.push(link);
    }
  };

  if (dataModel == null || dataModel?.getDetailViewLink() == null) {
    return null;
  }

  return (
    <div className={className}>
      <Button onClick={() => loadDashboard()} size={size} variant={variant}>
        <span className="my-auto"><IconBase className={"mr-1"} icon={icon} />View</span>
      </Button>
    </div>
  );
}

ModelLinkButton.propTypes = {
  icon: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.string,
  openInNewWindow: PropTypes.bool,
  dataModel: PropTypes.object,
  size: PropTypes.string
};

ModelLinkButton.defaultProps = {
  size: "sm"
};

export default ModelLinkButton;
