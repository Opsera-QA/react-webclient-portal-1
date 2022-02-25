import React from "react";
import PropTypes from "prop-types";
import {faExternalLink} from "@fortawesome/pro-light-svg-icons";
import {useHistory} from "react-router-dom";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import IconBase from "components/common/icons/IconBase";
import {hasStringValue} from "components/common/helpers/string-helpers";

function PageLinkIcon(
  {
    pageLink,
    pageLinkText,
    handleClose,
    className,
    linkTooltipText,
    externalLink
  }) {
  const history = useHistory();

  const handleLink = () => {
    if (handleClose) {
      handleClose();
    }

    if (externalLink === true) {
      window.open(pageLink, "_blank");
    }
    else {
      history.push(pageLink);
    }
  };

  const getPageLinkText = () => {
    if (hasStringValue(pageLinkText) === true) {
      return (
        <span className={"ml-2"}>{pageLinkText}</span>
      );
    }
  };

  if (hasStringValue(pageLink) !== true) {
    return null;
  }

  return (
    <TooltipWrapper innerText={linkTooltipText} placement={"bottom"}>
      <div className={className} onClick={() => handleLink()}>
        <div className={"d-flex pointer"}>
          <IconBase icon={faExternalLink} />
          {getPageLinkText()}
        </div>
      </div>
    </TooltipWrapper>
  );
}

PageLinkIcon.propTypes = {
  pageLink: PropTypes.string,
  handleClose: PropTypes.func,
  className: PropTypes.string,
  linkTooltipText: PropTypes.string,
  pageLinkText: PropTypes.string,
  externalLink: PropTypes.bool,
};

export default PageLinkIcon;