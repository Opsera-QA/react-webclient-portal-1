import React from "react";
import PropTypes from "prop-types";
import {faQuestionCircle} from "@fortawesome/pro-light-svg-icons";
import LaunchHelpIcon from "components/common/icons/help/LaunchHelpIcon";
import IconBase from "components/common/icons/IconBase";

function HelpDocumentationContainer({ children, isLoading, titleText, helpComponent, closeHelpPanel }) {
  const getTitleBar = () => {
    return (
      <div className="px-2 pt-2 d-flex justify-content-between">
        <div><IconBase isLoading={isLoading} icon={faQuestionCircle} className="mr-2"/>Help Documentation: {titleText}</div>
        <div>
          <LaunchHelpIcon helpComponent={helpComponent} className={"pt-2 pr-2"} />
        </div>
      </div>
    );
  };

  return (
    <div className="help-documentation-container">
      <div className="content-container">
        <div className="header">
          <h6>{getTitleBar()}</h6>
        </div>
        <div className={"help-body"}>
          {children}
        </div>
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
  closeHelpPanel: PropTypes.func
};

export default HelpDocumentationContainer;