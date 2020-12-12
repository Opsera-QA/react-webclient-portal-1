import React from "react";
import PropTypes from "prop-types";
import ActionBarEditorToggleButton from "../../actions/buttons/ActionBarEditorToggleButton";

function SummaryPanelContainer({ setActiveTab, children }) {
  const getSettingsToggle = () => {
    if (setActiveTab) {
      return <ActionBarEditorToggleButton setActiveTab={setActiveTab} />
    }
  };

  return (
    <div className="scroll-y">
      <div className="float-right mt-1">
        {getSettingsToggle()}
      </div>
      <div className="p-3">
        {children}
      </div>
    </div>
  );
}


SummaryPanelContainer.propTypes = {
  setActiveTab: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default SummaryPanelContainer;