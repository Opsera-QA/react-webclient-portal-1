import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { faTrash } from "@fortawesome/pro-light-svg-icons";
import { cannotBeUndone } from "components/common/tooltip/popover-text";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import IconBase from "components/common/icons/IconBase";
import { DialogToastContext } from "contexts/DialogToastContext";
import DeleteOverlay from "components/common/overlays/center/delete/DeleteOverlay";

export default function DeleteModelButtonWithConfirmationOverlay(
  {
    model,
    setModel,
    disabled,
    afterDeleteFunction,
    size,
    icon,
    className,
  }) {
  const toastContext = useContext(DialogToastContext);

  const handleDelete = async () => {
    const response = await model.deleteModel();

    setModel(undefined);

    return response;
  };

  const launchDeleteConfirmationModal = () => {
    toastContext.showOverlayPanel(
      <DeleteOverlay
        type={model?.getType()}
        handleDeleteFunction={handleDelete}
        afterDeleteFunction={afterDeleteFunction}
      />
    );
  };

  if (model == null || model?.isNew() || model?.canDelete() === false) {
    return null;
  }

  return (
    <div className={className}>
      <TooltipWrapper innerText={cannotBeUndone}>
        <Button
          size={size}
          variant={"danger"}
          disabled={disabled}
          onClick={launchDeleteConfirmationModal}
        >
          <span>
            <IconBase
              icon={icon}
              className={"mr-2"}
            />
            {`Delete ${model.getType()}`}
          </span>
        </Button>
      </TooltipWrapper>
    </div>
  );
}

DeleteModelButtonWithConfirmationOverlay.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  icon: PropTypes.object,
  afterDeleteFunction: PropTypes.func,
};

DeleteModelButtonWithConfirmationOverlay.defaultProps = {
  size: "md",
  icon: faTrash,
};