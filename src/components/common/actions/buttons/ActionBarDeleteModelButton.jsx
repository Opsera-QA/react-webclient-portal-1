import React  from "react";
import PropTypes from "prop-types";
import ActionBarButton from "./ActionBarButton";
import {faTrash} from "@fortawesome/pro-light-svg-icons";
import DeleteConfirmationOverlay from "components/common/overlays/center/delete/DeleteConfirmationOverlay";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function ActionBarDeleteModelButton(
  {
    model,
    type,
    afterDeleteFunction,
    className,
    visible,
  }) {
  const {
    toastContext,
  } = useComponentStateReference();

  const launchDeleteConfirmationModal = () => {
    toastContext.showOverlayPanel(
      <DeleteConfirmationOverlay
        type={model?.getType()}
        handleDeleteFunction={model?.deleteModel}
        afterDeleteFunction={afterDeleteFunction}
      />
    );
  };

  if (model?.canDelete() !== true || model?.deleteModel == null || visible === false) {
    return null;
  }

  return (
    <ActionBarButton
      action={launchDeleteConfirmationModal}
      icon={faTrash}
      iconClasses={"danger-red"}
      popoverText={`Delete this ${type}`}
      className={className}
    />
  );
}

ActionBarDeleteModelButton.propTypes = {
  model: PropTypes.object,
  afterDeleteFunction: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string,
  visible: PropTypes.func,
};