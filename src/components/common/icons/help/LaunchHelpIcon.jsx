import React, {useContext} from "react";
import PropTypes from "prop-types";
import {faQuestionCircle} from "@fortawesome/pro-light-svg-icons";
import ButtonTooltip from "components/common/tooltip/ButtonTooltip";
import {DialogToastContext} from "contexts/DialogToastContext";
import IconBase from "components/common/icons/IconBase";

// TODO: Remove iconClassName if unnecessary after refactoring PipelineWorkflowItem.jsx
function LaunchHelpIcon({ helpComponent, helpText, className, size, iconClassName, visible }) {
  const toastContext = useContext(DialogToastContext);

  const launchHelp = () => {
    toastContext.showOverlayPanel(helpComponent);
  };

  const getHelpText = () => {
    if (helpText) {
      return <span className="ml-1">{helpText}</span>;
    }
  };

  if (helpComponent == null || visible === false) {
    return null;
  }

  return (
    <div className={className}>
      <ButtonTooltip innerText={"Launch Help"}>
        <span>
          <IconBase
            onClickFunction={() => {launchHelp();}}
            icon={faQuestionCircle}
            iconSize={size}
            className={iconClassName ? `${iconClassName} pointer` : "pointer"}
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
  iconClassName: PropTypes.string,
  helpText: PropTypes.string,
  size: PropTypes.string,
  visible: PropTypes.bool,
};

export default LaunchHelpIcon;