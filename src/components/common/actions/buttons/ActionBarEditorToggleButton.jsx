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
      iconClasses={"dark-grey"}
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