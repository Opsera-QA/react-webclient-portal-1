import React, { useState} from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt} from "@fortawesome/pro-light-svg-icons";
import EditRolesModal from "components/common/inline_inputs/roles/modal/EditRolesModal";
import RoleAccessField from "components/common/fields/multiple_items/RoleAccessField";

function RoleAccessInlineInputBase({dataObject, fieldName, disabled, saveData, visible, noDataMessage}) {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const getEditButton = () => {
    if (!disabled) {
      return (
        <div onClick={() => {setShowModal(true);}} className={"ml-2 mt-2 pointer text-muted edit-button"}>
          <FontAwesomeIcon icon={faPencilAlt} className="mr-1"/>
        </div>
      );
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="role-access">
      <div className="d-flex">
        <div><RoleAccessField dataObject={dataObject} fieldName={fieldName} noDataMessage={noDataMessage} /></div>
        <div>{getEditButton()}</div>
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
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  saveData: PropTypes.func,
  noDataMessage: PropTypes.any
};

RoleAccessInlineInputBase.defaultProps = {
  visible: true
}

export default RoleAccessInlineInputBase;