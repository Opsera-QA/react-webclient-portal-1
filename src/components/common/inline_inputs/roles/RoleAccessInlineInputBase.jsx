import React, { useState} from "react";
import PropTypes from "prop-types";
import EditRolesModal from "components/common/inline_inputs/roles/modal/EditRolesModal";
import RoleAccessField from "components/common/fields/multiple_items/roles/RoleAccessField";
import LaunchHelpIcon from "components/common/icons/help/LaunchHelpIcon";
import EditIcon from "components/common/icons/field/EditIcon";

function RoleAccessInlineInputBase({dataObject, fieldName, disabled, saveData, visible, noDataMessage, helpComponent}) {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const showEditor = () => {
    if (!disabled) {
      setShowModal(true);
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="role-access">
      <div className="d-flex">
        <div><RoleAccessField dataObject={dataObject} fieldName={fieldName} noDataMessage={noDataMessage} /></div>
        <div className="edit-button d-flex">
          <EditIcon
            className={"ml-2 mt-2 text-muted"}
            editFunction={showEditor}
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
      <EditRolesModal
        dataObject={dataObject}
        fieldName={fieldName}
        saveData={saveData}
        showModal={showModal}
        handleClose={closeModal}
      />
    </div>
  );
}

RoleAccessInlineInputBase.propTypes = {
  helpComponent: PropTypes.object,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  saveData: PropTypes.func,
  noDataMessage: PropTypes.any
};

RoleAccessInlineInputBase.defaultProps = {
  visible: true
};

export default RoleAccessInlineInputBase;