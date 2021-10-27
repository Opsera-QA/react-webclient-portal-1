import React from "react";
import PropTypes from "prop-types";
import ActionBarEditorToggleButton from "components/common/actions/buttons/ActionBarEditorToggleButton";

function SummaryPanelContainer({ setActiveTab, editingAllowed, children, settingsTab, className }) {
  const getSettingsToggle = () => {
    if (editingAllowed && setActiveTab) {
      return (
        <div className="float-right mt-2">
          <ActionBarEditorToggleButton setActiveTab={setActiveTab} settingsTab={settingsTab} />
        </div>
      );
    }
  };

  return (
    <div className="scroll-y h-100">
      {getSettingsToggle()}
      <div className={className}>
        {children}
      </div>
    </div>
  );
}

SummaryPanelContainer.propTypes = {
  setActiveTab: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  editingAllowed: PropTypes.bool,
  settingsTab: PropTypes.string,
  className: PropTypes.string
};

SummaryPanelContainer.defaultProps = {
  editingAllowed: true,
  className: "py-3"
};

export default SummaryPanelContainer;