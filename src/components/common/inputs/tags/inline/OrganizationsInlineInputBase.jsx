import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import EditIcon from "components/common/icons/field/EditIcon";
import OrganizationMultiSelectOverlay from "components/common/inputs/tags/inline/modal/OrganizationMultiSelectOverlay";
import AppliedOrganizationsBadge from "components/common/badges/tag/AppliedOrganizationsBadge";
import { DialogToastContext } from "contexts/DialogToastContext";

function OrganizationsInlineInputBase({ model, fieldName, disabled, saveDataFunction, visible, type, tagLocation }) {
  const toastContext = useContext(DialogToastContext);

  const showEditor = () => {
    toastContext.showOverlayPanel(
      <OrganizationMultiSelectOverlay
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
          <AppliedOrganizationsBadge
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
            tooltipBody={`Select ${tagLocation ? `${tagLocation} ` : ""}Organizations`}
          />
        </div>
      </div>
    </div>
  );
}

OrganizationsInlineInputBase.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  tagLocation: PropTypes.string,
  saveDataFunction: PropTypes.func,
  type: PropTypes.string,
};

OrganizationsInlineInputBase.defaultProps = {
  fieldName: "organizations",
};

export default OrganizationsInlineInputBase;
