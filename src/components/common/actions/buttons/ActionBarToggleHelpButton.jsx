import React  from "react";
import PropTypes from "prop-types";
import {faQuestionCircle, faTimes} from "@fortawesome/pro-light-svg-icons";
import ActionBarButton from "components/common/actions/buttons/ActionBarButton";

function ActionBarToggleHelpButton({ toggleHelp, helpIsShown, size }) {
  const toggleHelpPanel = () => {
    toggleHelp();
  };

  return (
    <ActionBarButton
      action={toggleHelpPanel}
      iconClasses={"dark-grey"}
      icon={helpIsShown ? faTimes : faQuestionCircle}
      popoverText={helpIsShown ? "Hide Help" : `Show Help`}
      size={size}
      className={helpIsShown ? "mr-1" : ""}
    />
  );
}

ActionBarToggleHelpButton.propTypes = {
  toggleHelp: PropTypes.func,
  helpIsShown: PropTypes.bool,
  size: PropTypes.string
};

export default ActionBarToggleHelpButton;