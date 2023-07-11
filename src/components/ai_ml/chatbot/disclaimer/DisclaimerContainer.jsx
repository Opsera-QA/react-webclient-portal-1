import React from "react";
import PropTypes from "prop-types";
import PageLinkIcon from "components/common/icons/general/PageLinkIcon";
import CloseIcon from "components/common/icons/general/CloseIcon";
import IconBase from "components/common/icons/IconBase";
import OverlayIconBase from "../../../common/icons/OverlayIconBase";
import {faCheck, faTimes} from "@fortawesome/pro-light-svg-icons";

function DisclaimerContainer({ children, isLoading, title, confluenceLink, closePanel, externalLinkText, bodyClassName }) {
  const getTitleBar = () => {
    return (
      <div className={"p-2 d-flex justify-content-between my-auto"}>
        <div className={"d-flex"}>
          <IconBase isLoading={isLoading} className="mr-2"/>
          <span>{title} Disclaimer</span>
        </div>
        <div className={"d-flex"}>
          <PageLinkIcon
            pageLink={confluenceLink}
            externalLink={true}
            className={"pr-2"}
            linkTooltipText={externalLinkText}
          />
          <CloseIcon
            overlayBody={"Acknowledge"}
            handleCloseFunction={closePanel}
            size={"lg"}
          />
        </div>
      </div>
    );
  };

  return (
    <div
      className={"disclaimer-container content-container-border"}
      style={{
        overflow: "hidden",
      }}
    >
      <div className={"content-block-header title-text-header-1 header mb-0"}>
        {getTitleBar()}
      </div>
      <div className={`disclaimer-body ${bodyClassName}`}>
        {children}
      </div>
    </div>
  );
}

DisclaimerContainer.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
  isLoading: PropTypes.bool,
  closePanel: PropTypes.func,
  confluenceLink: PropTypes.string,
  externalLinkText: PropTypes.string,
  bodyClassName: PropTypes.string
};

DisclaimerContainer.defaultProps = {
  externalLinkText: "View Detailed Help Documentation",
  bodyClassName: "p-3"
};

export default DisclaimerContainer;