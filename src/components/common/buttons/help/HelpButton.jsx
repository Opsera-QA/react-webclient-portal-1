import React from "react";
import PropTypes from "prop-types";
import {faQuestionCircle} from "@fortawesome/pro-light-svg-icons";
import ButtonTooltip from "components/common/tooltip/ButtonTooltip";
import {Button} from "react-bootstrap";
import IconBase from "components/common/icons/IconBase";

function HelpButton({ toggleHelp, helpText, className, size }) {
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
      <ButtonTooltip innerText={"Launch Help"}>
        <Button size={size} variant={"secondary"} onClick={() => toggleHelp()}>
          <IconBase icon={faQuestionCircle} />
          {getHelpText()}
        </Button>
      </ButtonTooltip>
    </div>
  );
}

HelpButton.propTypes = {
  toggleHelp: PropTypes.func,
  className: PropTypes.string,
  helpText: PropTypes.string,
  size: PropTypes.string
};


HelpButton.defaultProps = {
  size: "sm",
  helpText: "Help"
};

export default HelpButton;