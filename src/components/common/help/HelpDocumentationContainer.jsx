import React from "react";
import PropTypes from "prop-types";
import {faBookAlt} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import PageLinkIcon from "components/common/icons/general/PageLinkIcon";
import CloseIcon from "components/common/icons/general/CloseIcon";

function HelpDocumentationContainer({ children, isLoading, titleText, helpComponent, confluenceLink, closeHelpPanel }) {
  const getTitleBar = () => {
    return (
      <div className="pt-2 px-2 d-flex justify-content-between my-auto">
        <div className={"d-flex"}><IconBase isLoading={isLoading} icon={faBookAlt} className="mr-2"/>Opsera Help: {titleText}</div>
        <div className={"d-flex"}>
          <PageLinkIcon
            pageLink={confluenceLink}
            externalLink={true}
            helpComponent={helpComponent}
            className={"pr-2"}
          />
          <CloseIcon handleClose={closeHelpPanel} size={"lg"} />
        </div>
      </div>
    );
  };

  return (
    <div className="help-documentation-container">
      <div className="header h6 mb-0">
        {getTitleBar()}
      </div>
      <div className={"help-body"}>
        {children}
      </div>
    </div>
  );
}

HelpDocumentationContainer.propTypes = {
  titleText: PropTypes.string,
  children: PropTypes.any,
  helpComponent: PropTypes.any,
  toggleButton: PropTypes.object,
  isLoading: PropTypes.bool,
  closeHelpPanel: PropTypes.func,
  confluenceLink: PropTypes.string
};

export default HelpDocumentationContainer;