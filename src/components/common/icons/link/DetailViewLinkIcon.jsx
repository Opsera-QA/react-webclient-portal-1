import React from "react";
import PropTypes from "prop-types";
import {faLink} from "@fortawesome/pro-light-svg-icons";
import {useHistory} from "react-router-dom";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import IconBase from "components/common/icons/IconBase";

function DetailViewLinkIcon({ pageLink, openInNewWindow, handleClose, className, linkTooltipText, size, placement, icon }) {
  let history = useHistory();

  const handleLink = () => {
    if (handleClose) {
      handleClose();
    }

    if (openInNewWindow !== false) {
      window.open(pageLink);
    }
    else {
      history.push(pageLink);
    }
  };

  if (pageLink == null) {
    return null;
  }

  return (
    <TooltipWrapper innerText={linkTooltipText} placement={placement}>
      <span className={className} onClick={() => {handleLink();}}>
        <IconBase
          icon={icon}
          iconSize={size}
          className={"pointer"}
        />
      </span>
    </TooltipWrapper>
  );
}

DetailViewLinkIcon.propTypes = {
  pageLink: PropTypes.string,
  handleClose: PropTypes.func,
  className: PropTypes.string,
  openInNewWindow: PropTypes.bool,
  linkTooltipText: PropTypes.string,
  size: PropTypes.string,
  placement: PropTypes.string,
  icon: PropTypes.object,
};

DetailViewLinkIcon.defaultProps = {
  icon: faLink
};

export default DetailViewLinkIcon;