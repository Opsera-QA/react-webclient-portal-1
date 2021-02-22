import React, {useContext} from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faQuestionCircle} from "@fortawesome/pro-light-svg-icons";
import ButtonTooltip from "components/common/tooltip/ButtonTooltip";
import {DialogToastContext} from "contexts/DialogToastContext";

function LaunchHelpIcon({ helpComponent, className }) {
  const toastContext = useContext(DialogToastContext);

  const launchHelp = () => {
    toastContext.showOverlayPanel(helpComponent);
  };

  if (helpComponent == null) {
    return null;
  }

  return (
    <div className={className}>
      <ButtonTooltip innerText={"Launch Help"}>
        <FontAwesomeIcon
          onClick={() => {launchHelp()}}
          icon={faQuestionCircle}
          fixedWidth
          className={"pointer"}
        />
      </ButtonTooltip>
    </div>
  );
}

LaunchHelpIcon.propTypes = {
  helpComponent: PropTypes.any,
  className: PropTypes.string
};

export default LaunchHelpIcon;