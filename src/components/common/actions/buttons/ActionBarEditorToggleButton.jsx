import React  from "react";
import PropTypes from "prop-types";
import {faCogs} from "@fortawesome/pro-light-svg-icons";
import ActionBarButton from "components/common/actions/buttons/ActionBarButton";

function ActionBarEditorToggleButton({ setActiveTab, settingsTab }) {
  const toggleEditorPanel = () => {
    setActiveTab(settingsTab);
  };

  return (
    <ActionBarButton
      action={toggleEditorPanel}
      iconClasses={"mr-2 dark-grey"}
      text={"Settings"}
      icon={faCogs}
      popoverText={`Edit Settings`}
    />
  );
}

ActionBarEditorToggleButton.propTypes = {
  setActiveTab: PropTypes.func,
  settingsTab: PropTypes.string
};

ActionBarEditorToggleButton.defaultProps = {
  settingsTab: "settings"
};

export default ActionBarEditorToggleButton;