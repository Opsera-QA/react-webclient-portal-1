import React  from "react";
import PropTypes from "prop-types";
import ActionBarButton from "./ActionBarButton";
import {faCogs} from "@fortawesome/pro-light-svg-icons";

function ActionBarEditorToggleButton({ setActiveTab }) {
  const toggleEditorPanel = () => {
    setActiveTab("settings");
  }

  return (
    <ActionBarButton
      action={toggleEditorPanel}
      iconClasses={"mr-2 dark-grey"}
      icon={faCogs}
      popoverText={`Toggle Settings`}
    />
  );
}

ActionBarEditorToggleButton.propTypes = {
  setActiveTab: PropTypes.func,
};

export default ActionBarEditorToggleButton;