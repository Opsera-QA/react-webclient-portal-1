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
    <div className="scroll-y pt-2 px-3">
      <div className="float-right mt-1">
        {getSettingsToggle()}
      </div>
      <div className="mb-3 p-3 detail-view-summary">
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