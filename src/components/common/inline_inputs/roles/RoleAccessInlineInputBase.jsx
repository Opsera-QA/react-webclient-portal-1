import React, {useContext} from "react";
import PropTypes from "prop-types";
import EditRolesOverlay from "components/common/inline_inputs/roles/overlay/EditRolesOverlay";
import RoleAccessField from "components/common/fields/multiple_items/roles/RoleAccessField";
import LaunchHelpIcon from "components/common/icons/help/LaunchHelpIcon";
import EditIcon from "components/common/icons/field/EditIcon";
import {DialogToastContext} from "contexts/DialogToastContext";
import useComponentStateReference from "hooks/useComponentStateReference";

function RoleAccessInlineInputBase(
  {
    model,
    fieldName,
    disabled,
    saveData,
    visible,
    helpComponent,
  }) {
  const toastContext = useContext(DialogToastContext);
  const {
    isFreeTrial,
    isOpseraAdministrator,
  } = useComponentStateReference();

  const showEditor = () => {
    if (!disabled) {
      toastContext.showOverlayPanel(
        <EditRolesOverlay
          model={model}
          fieldName={fieldName}
          saveDataFunction={saveData}
        />
      );
    }
  };

  if (visible === false || (isFreeTrial === true && isOpseraAdministrator !== true)) {
    return null;
  }

  return (
    <div className="role-access">
      <div className="d-flex">
        <div>
          <RoleAccessField
            model={model}
            fieldName={fieldName}
          />
        </div>
        <div className="edit-button d-flex">
          <EditIcon
            className={"ml-2 mt-2 text-muted"}
            handleEditFunction={showEditor}
            disabled={disabled}
            tooltipBody={"Edit Access Rules"}
          />
          <LaunchHelpIcon
            visible={disabled !== true}
            helpComponent={helpComponent}
            className={"mt-2 ml-2 text-muted"}
          />
        </div>
      </div>
    </div>
  );
}

RoleAccessInlineInputBase.propTypes = {
  helpComponent: PropTypes.object,
  fieldName: PropTypes.string,
  model: PropTypes.object,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  saveData: PropTypes.func,
};

export default RoleAccessInlineInputBase;