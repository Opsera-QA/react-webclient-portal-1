import React, {useState} from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt} from "@fortawesome/pro-light-svg-icons";
import EditRolesModal from "components/common/inline_inputs/roles/modal/EditRolesModal";
import RoleAccessField from "components/common/fields/multiple_items/RoleAccessField";
import Button from "react-bootstrap/Button";

function RoleAccessInlineInputBase({dataObject, fieldName, disabled, saveData}) {
  const [showModal, setShowModal] = useState(false);

  const handleSave = async (newRoles) => {
      try {
        const response = await saveData(newRoles);
        setShowModal(false);
      }
      catch (error) {
        console.error(error);
        // TODO: Add toast context error toast
      }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const getEditButton = () => {
    if (!disabled) {
      return (
        <div onClick={() => {setShowModal(true);}} className={"ml-2 mt-2 pointer text-muted"}>
          <FontAwesomeIcon icon={faPencilAlt} className="mr-1"/>
          Edit Roles
        </div>
      );
    }
  };

  return (
    <div>
      <div className="d-flex">
        <div><RoleAccessField dataObject={dataObject} fieldName={fieldName} /></div>
        <div>{getEditButton()}</div>
      </div>
      <EditRolesModal
        dataObject={dataObject}
        fieldName={fieldName}
        saveData={handleSave}
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
  saveData: PropTypes.func
};

export default RoleAccessInlineInputBase;