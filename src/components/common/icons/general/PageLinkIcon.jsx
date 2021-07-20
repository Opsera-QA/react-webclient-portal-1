import React from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExternalLink} from "@fortawesome/pro-light-svg-icons";
import {useHistory} from "react-router-dom";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

function PageLinkIcon({ pageLink, openInNewWindow, handleClose, className, linkTooltipText, externalLink }) {
  let history = useHistory();

  const handleLink = () => {
    if (handleClose) {
      handleClose();
    }

    // TODO: Leaving this as separate for external link until I find out if we want to do anything on React end
    if (openInNewWindow === true) {
      window.open(pageLink);
    }
    else if (externalLink === true) {
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
    <TooltipWrapper innerText={linkTooltipText} placement={"bottom"}>
      <div className={className}>
        <FontAwesomeIcon
          onClick={() => {handleLink();}}
          icon={faExternalLink}
          fixedWidth
          className={"pointer"}
        />
      </div>
    </TooltipWrapper>
  );
}

PageLinkIcon.propTypes = {
  pageLink: PropTypes.string,
  handleClose: PropTypes.func,
  className: PropTypes.string,
  openInNewWindow: PropTypes.bool,
  linkTooltipText: PropTypes.string,
  externalLink: PropTypes.bool,
};

export default PageLinkIcon;