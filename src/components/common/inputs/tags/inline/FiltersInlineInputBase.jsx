import React, {useContext} from "react";
import PropTypes from "prop-types";
import EditIcon from "components/common/icons/field/EditIcon";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import FiltersMultiSelectOverlay from "components/common/inputs/tags/inline/modal/FiltersMultiSelectOverlay";
import AppliedFiltersBadge from "components/common/badges/tag/AppliedFiltersBadge";
import {DialogToastContext} from "contexts/DialogToastContext";

function FiltersInlineInputBase(
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
      <FiltersMultiSelectOverlay
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
          <AppliedFiltersBadge
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
            tooltipBody={`Select ${type ? `${type} ` : ""}Filters`}
          />
        </div>
      </div>
    </div>
  );
}

FiltersInlineInputBase.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  tagLocation: PropTypes.string,
  saveDataFunction: PropTypes.func,
  type: PropTypes.string,
  badgeClassName: PropTypes.string,
};

FiltersInlineInputBase.defaultProps = {
  fieldName: "tags",
};

export default FiltersInlineInputBase;