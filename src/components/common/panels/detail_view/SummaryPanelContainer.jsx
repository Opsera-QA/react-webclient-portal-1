import React from "react";
import PropTypes from "prop-types";
import ActionBarEditorToggleButton from "components/common/actions/buttons/ActionBarEditorToggleButton";
import { faCogs } from "@fortawesome/pro-light-svg-icons";
import ActionBarButton from "components/common/actions/buttons/ActionBarButton";
import useComponentStateReference from "hooks/useComponentStateReference";

function SummaryPanelContainer({ setActiveTab, editingAllowed, children, settingsTab, className }) {
  const {
    isOpseraAdministrator,
  } = useComponentStateReference();

  const getSettingsToggle = () => {
    if (isOpseraAdministrator !== true) {
      return (
        <div className="float-right mt-2">
          <ActionBarButton
            iconClasses={"dark-grey"}
            icon={faCogs}
            popoverText={`Editing Settings is available in the main Opsera offering.`}
          />
        </div>
      );
    }

    if (editingAllowed && setActiveTab) {
      return (
        <div className="float-right mt-2">
          <ActionBarEditorToggleButton setActiveTab={setActiveTab} settingsTab={settingsTab} />
        </div>
      );
    }
  };

  return (
    <div className="scroll-y hide-x-overflow h-100">
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