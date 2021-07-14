import React  from "react";
import PropTypes from "prop-types";
import {faCogs, faQuestionCircle} from "@fortawesome/pro-light-svg-icons";
import ActionBarButton from "components/common/actions/buttons/ActionBarButton";

function ActionBarToggleHelpButton({ toggleHelp, helpIsShown }) {
  const toggleHelpPanel = () => {
    toggleHelp();
  };

  return (
    <ActionBarButton
      action={toggleHelpPanel}
      iconClasses={"dark-grey"}
      icon={helpIsShown ? faCogs : faQuestionCircle}
      popoverText={helpIsShown ? "Hide Help" : `Show Help`}
    />
  );
}

ActionBarToggleHelpButton.propTypes = {
  toggleHelp: PropTypes.func,
  helpIsShown: PropTypes.bool
};

export default ActionBarToggleHelpButton;