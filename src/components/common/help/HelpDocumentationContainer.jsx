import React from "react";
import PropTypes from "prop-types";
import PageLinkIcon from "components/common/icons/general/PageLinkIcon";
import CloseIcon from "components/common/icons/general/CloseIcon";
import IconBase from "components/common/icons/IconBase";

function HelpDocumentationContainer({ children, isLoading, helpTopic, confluenceLink, closeHelpPanel, externalLinkText, bodyClassName }) {
  const getTitleBar = () => {
    return (
      <div className="pt-2 px-2 d-flex justify-content-between my-auto">
        <div className={"d-flex"}>
          <IconBase isLoading={isLoading} className="mr-2"/>
          <span>{helpTopic} Help</span>
        </div>
        <div className={"d-flex"}>
          <PageLinkIcon
            pageLink={confluenceLink}
            externalLink={true}
            className={"pr-2"}
            linkTooltipText={externalLinkText}
          />
          <CloseIcon
            overlayBody={"Close Help"}
            handleCloseFunction={closeHelpPanel}
            size={"lg"}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="help-documentation-container">
      <div className="header h6 pb-2 mb-0">
        {getTitleBar()}
      </div>
      <div className={`help-body ${bodyClassName}`}>
        {children}
      </div>
    </div>
  );
}

HelpDocumentationContainer.propTypes = {
  helpTopic: PropTypes.string,
  children: PropTypes.any,
  isLoading: PropTypes.bool,
  closeHelpPanel: PropTypes.func,
  confluenceLink: PropTypes.string,
  externalLinkText: PropTypes.string,
  bodyClassName: PropTypes.string
};

HelpDocumentationContainer.defaultProps = {
  externalLinkText: "View Detailed Help Documentation",
  bodyClassName: "p-3"
};

export default HelpDocumentationContainer;