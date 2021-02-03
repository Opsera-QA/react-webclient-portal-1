import React from "react";
import PropTypes from "prop-types";
import ActionBarEditorToggleButton from "components/common/actions/buttons/ActionBarEditorToggleButton";

function SummaryPanelContainer({ setActiveTab, editingAllowed, children }) {
  const getSettingsToggle = () => {
    if (editingAllowed && setActiveTab) {
      return (
        <div className="float-right mt-2 mr-2">
          <ActionBarEditorToggleButton setActiveTab={setActiveTab} />
        </div>
      );
    }
  };

  return (
    <div className="scroll-y">
      {getSettingsToggle()}
      <div className="p-3">
        {children}
      </div>
    </div>
  );
}

SummaryPanelContainer.propTypes = {
  setActiveTab: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  editingAllowed: PropTypes.bool
};

SummaryPanelContainer.defaultProps = {
  editingAllowed: true
};

export default SummaryPanelContainer;