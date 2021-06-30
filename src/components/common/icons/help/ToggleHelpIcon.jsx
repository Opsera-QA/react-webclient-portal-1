import React from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faQuestionCircle} from "@fortawesome/pro-light-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

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
          <FontAwesomeIcon icon={faQuestionCircle} fixedWidth />
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


ToggleHelpIcon.defaultProps = {
  size: "lg",
};

export default ToggleHelpIcon;