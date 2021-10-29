import React, { useState} from "react";
import PropTypes from "prop-types";
import EditIcon from "components/common/icons/field/EditIcon";
import EditTagsModal from "components/common/inline_inputs/tags/modal/EditTagsModal";
import TagField from "components/common/fields/multiple_items/tags/TagField";

function TagsInlineInputBase({dataObject, fieldName, disabled, saveData, visible, noDataMessage, type}) {
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
        <div><TagField dataObject={dataObject} fieldName={fieldName} noDataMessage={noDataMessage} /></div>
        <div className="edit-button d-flex">
          <EditIcon className={"ml-2 mt-2 text-muted"} editFunction={showEditor} disabled={disabled} tooltipBody={"Edit Tags"} />
        </div>
      </div>
      <EditTagsModal
        type={type}
        dataObject={dataObject}
        fieldName={fieldName}
        saveData={saveData}
        showModal={showModal}
        handleClose={closeModal}
      />
    </div>
  );
}

TagsInlineInputBase.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  saveData: PropTypes.func,
  noDataMessage: PropTypes.any,
  type: PropTypes.string
};

TagsInlineInputBase.defaultProps = {
  visible: true
};

export default TagsInlineInputBase;