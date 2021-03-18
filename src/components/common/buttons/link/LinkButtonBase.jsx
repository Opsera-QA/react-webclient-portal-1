import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import {useHistory} from "react-router-dom";
import IconBase from "components/common/icons/IconBase";

function LinkButtonBase({icon, text, size, openInNewWindow, className, variant, link}) {
  let history = useHistory();

  const handleRoute = () => {
    if (openInNewWindow) {
      window.open(link);
    }
    else {
      history.push(link);
    }
  };

  if (link == null) {
    return null;
  }

  return (
    <div className={className}>
      <Button onClick={() => handleRoute()} size={size} variant={variant}>
        <span className="my-auto"><IconBase className={"mr-2"} icon={icon} />{text}</span>
      </Button>
    </div>
  );
}

LinkButtonBase.propTypes = {
  icon: PropTypes.object,
  text: PropTypes.object,
  className: PropTypes.string,
  variant: PropTypes.string,
  openInNewWindow: PropTypes.bool,
  size: PropTypes.string,
  link: PropTypes.string
};

LinkButtonBase.defaultProps = {
  size: "sm"
};

export default LinkButtonBase;
