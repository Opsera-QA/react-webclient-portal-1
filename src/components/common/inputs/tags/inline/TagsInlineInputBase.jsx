import React, { useState} from "react";
import PropTypes from "prop-types";
import EditIcon from "components/common/icons/field/EditIcon";
import TagMultiSelectOverlay from "components/common/inputs/tags/inline/modal/TagMultiSelectOverlay";
import AppliedTagBadge from "components/common/badges/tag/AppliedTagBadge";

function TagsInlineInputBase(
  {
    model,
    fieldName,
    disabled,
    saveDataFunction,
    visible,
    type,
    tagLocation,
  }) {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const showEditor = () => {
    setShowModal(true);
  };

  if (visible === false || model == null) {
    return null;
  }

  return (
    <div className="role-access">
      <div className="d-flex">
        <div>
          <AppliedTagBadge
            tags={model?.getData(fieldName)}
            tagLocation={tagLocation}
            showNoTagsAppliedBadge={true}
          />
        </div>
        <div>
          <EditIcon
            className={"ml-2 text-muted"}
            handleEditFunction={showEditor}
            disabled={disabled || saveDataFunction == null}
            tooltipBody={`Select ${tagLocation ? `${tagLocation} ` : ""}Tags`}
          />
        </div>
      </div>
      <TagMultiSelectOverlay
        type={type}
        dataObject={model}
        fieldName={fieldName}
        saveDataFunction={saveDataFunction}
        showModal={showModal}
        handleClose={closeModal}
      />
    </div>
  );
}

TagsInlineInputBase.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  tagLocation: PropTypes.string,
  saveDataFunction: PropTypes.func,
  type: PropTypes.string,
};

TagsInlineInputBase.defaultProps = {
  fieldName: "tags",
};

export default TagsInlineInputBase;