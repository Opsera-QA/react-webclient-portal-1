import React, {useContext} from "react";
import PropTypes from "prop-types";
import EditRolesOverlay from "components/common/inline_inputs/roles/overlay/EditRolesOverlay";
import RoleAccessFieldBase from "components/common/fields/multiple_items/roles/RoleAccessFieldBase";
import LaunchHelpIcon from "components/common/icons/help/LaunchHelpIcon";
import EditIcon from "components/common/icons/field/EditIcon";
import {DialogToastContext} from "contexts/DialogToastContext";
import useComponentStateReference from "hooks/useComponentStateReference";
import FieldContainer from "components/common/fields/FieldContainer";

function RoleAccessInlineInputBase(
  {
    model,
    fieldName,
    disabled,
    saveData,
    visible,
    helpComponent,
    className,
    lostAccessRerouteRoute,
  }) {
  const toastContext = useContext(DialogToastContext);
  const {
    isFreeTrial,
    isOpseraAdministrator,
    isSassUser,
  } = useComponentStateReference();

  const handleEditFunction = () => {
    if (!disabled) {
      toastContext.showOverlayPanel(
        <EditRolesOverlay
          model={model}
          fieldName={fieldName}
          saveDataFunction={saveData}
          lostAccessRerouteRoute={lostAccessRerouteRoute}
        />
      );
    }
  };

  if (visible === false || isSassUser === true || (isFreeTrial === true && isOpseraAdministrator !== true)) {
    return null;
  }

  return (
    <FieldContainer
      className={className}
    >
      <div className="role-access">
        <div className="d-flex">
          <div>
            <RoleAccessFieldBase
              model={model}
              fieldName={fieldName}
              handleEditFunction={handleEditFunction}
              disabled={disabled}
            />
          </div>
          <div className={"edit-button d-flex"}>
            <EditIcon
              className={"ml-2 text-muted"}
              handleEditFunction={handleEditFunction}
              disabled={disabled}
              tooltipBody={"Edit Access Rules"}
              iconTransformProperties={"shrink-5"}
            />
            <LaunchHelpIcon
              visible={disabled !== true}
              helpComponent={helpComponent}
              className={"ml-2 text-muted"}
            />
          </div>
        </div>
      </div>
    </FieldContainer>
  );
}

RoleAccessInlineInputBase.propTypes = {
  helpComponent: PropTypes.object,
  fieldName: PropTypes.string,
  model: PropTypes.object,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  saveData: PropTypes.func,
  className: PropTypes.string,
  lostAccessRerouteRoute: PropTypes.string,
};

RoleAccessInlineInputBase.defaultProps = {
  fieldName: "roles",
};

export default RoleAccessInlineInputBase;