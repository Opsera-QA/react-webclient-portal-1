import React, {useContext} from "react";
import PropTypes from "prop-types";
import EditIcon from "components/common/icons/field/EditIcon";
import TagMultiSelectOverlay from "components/common/inputs/tags/inline/modal/TagMultiSelectOverlay";
import AppliedTagBadge from "components/common/badges/tag/AppliedTagBadge";
import {DialogToastContext} from "contexts/DialogToastContext";

function TagsInlineInputBase(
  {
    model,
    fieldName,
    disabled,
    saveDataFunction,
    badgeClassName,
    visible,
    type,
    tagLocation,
  }) {
  const toastContext = useContext(DialogToastContext);

  const showEditor = () => {
    toastContext.showOverlayPanel(
      <TagMultiSelectOverlay
        type={type}
        dataObject={model}
        fieldName={fieldName}
        saveDataFunction={saveDataFunction}
        showModal={true}
      />
    );
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
            badgeClassName={badgeClassName}
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
  badgeClassName: PropTypes.string,
};

TagsInlineInputBase.defaultProps = {
  fieldName: "tags",
};

export default TagsInlineInputBase;