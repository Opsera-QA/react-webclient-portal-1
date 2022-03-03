import React from "react";
import PropTypes from "prop-types";
import {faQuestionCircle} from "@fortawesome/pro-light-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import IconBase from "components/common/icons/IconBase";

function ToggleHelpIcon({ toggleHelp, helpText, className, size }) {
  const getHelpText = () => {
    if (helpText) {
      return <span className="ml-1">{helpText}</span>;
    }
  };

  if (toggleHelp == null) {
    return null;
  }

  return (
    <div className={className}>
      <TooltipWrapper innerText={"Toggle Help"}>
        <div onClick={() => toggleHelp()} className={"pointer"}>
          <IconBase icon={faQuestionCircle} iconSize={size} />
          {getHelpText()}
        </div>
      </TooltipWrapper>
    </div>
  );
}

ToggleHelpIcon.propTypes = {
  toggleHelp: PropTypes.func,
  className: PropTypes.string,
  helpText: PropTypes.string,
  size: PropTypes.string
};

export default ToggleHelpIcon;