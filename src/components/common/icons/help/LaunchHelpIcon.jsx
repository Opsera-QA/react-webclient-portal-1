import React, {useContext} from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faQuestionCircle} from "@fortawesome/pro-light-svg-icons";
import ButtonTooltip from "components/common/tooltip/ButtonTooltip";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";

function LaunchHelpIcon({ helpComponent, helpText, className }) {
  const { featureFlagHideItemInProd, featureFlagHideItemInTest } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);

  const launchHelp = () => {
    toastContext.showOverlayPanel(helpComponent);
  };

  const getHelpText = () => {
    if (helpText) {
      return <span className="ml-1">{helpText}</span>;
    }
  };

  if (helpComponent == null || featureFlagHideItemInProd()) {
    return null;
  }

  return (
    <div className={className}>
      <ButtonTooltip innerText={"Launch Help"}>
        <span>
          <FontAwesomeIcon
            onClick={() => {launchHelp();}}
            icon={faQuestionCircle}
            fixedWidth
            className={"pointer"}
          />
          {getHelpText()}
        </span>
      </ButtonTooltip>
    </div>
  );
}

LaunchHelpIcon.propTypes = {
  helpComponent: PropTypes.any,
  className: PropTypes.string,
  helpText: PropTypes.string
};

export default LaunchHelpIcon;