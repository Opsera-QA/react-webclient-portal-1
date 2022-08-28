import React, {useContext} from "react";
import PropTypes from "prop-types";
import EditIcon from "components/common/icons/field/EditIcon";
import TagMultiSelectOverlay from "components/common/inputs/tags/inline/modal/TagMultiSelectOverlay";
import AppliedTagBadge from "components/common/badges/tag/AppliedTagBadge";
import {DialogToastContext} from "contexts/DialogToastContext";
import useComponentStateReference from "hooks/useComponentStateReference";
import OverlayIconBase from "components/common/icons/OverlayIconBase";
import { faPencilAlt } from "@fortawesome/pro-light-svg-icons";

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
    loadData,
  }) {
  const toastContext = useContext(DialogToastContext);
  const {
    isOpseraAdministrator,
  } = useComponentStateReference();

  const getEditIcon = () => {
    if (isOpseraAdministrator === true) {
      return (
        <EditIcon
          className={"ml-2 text-muted"}
          handleEditFunction={showEditor}
          disabled={disabled || saveDataFunction == null}
          tooltipBody={`Select ${tagLocation ? `${tagLocation} ` : ""}Tags`}
        />
      );
    }

    return (
      <div className={"ml-2 text-muted"}>
        <OverlayIconBase
          className={"text-muted pointer"}
          icon={faPencilAlt}
          overlayBody={"In the main Opsera offering you can set Tags across the platform to drive unified insights tailored to your needs"}
        />
      </div>
    );
  };

  const showEditor = () => {
    toastContext.showOverlayPanel(
      <TagMultiSelectOverlay
        type={type}
        model={model}
        fieldName={fieldName}
        saveDataFunction={saveDataFunction}
        loadData={loadData}
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
          {getEditIcon()}
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
  loadData: PropTypes.func,
};

TagsInlineInputBase.defaultProps = {
  fieldName: "tags",
};

export default TagsInlineInputBase;