import React, {useContext, useRef} from "react";
import PropTypes from "prop-types";
import {faTrash} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import ActionBarButton from "components/common/actions/buttons/ActionBarButton";
import DeleteToolOverlay from "components/inventory/tools/delete_overlay/DeleteToolOverlay";

function ActionBarDeleteToolButton({ toolModel, className }) {
  const toastContext = useContext(DialogToastContext);

  const showOverlayFunction = async () => {
    toastContext.showOverlayPanel(
      <DeleteToolOverlay
        toolModel={toolModel}
        toolId={toolModel?.getData("_id")}
      />
    );
  };

  if (toolModel?.canPerformAction("delete_tool") !== true) {
    return <></>;
  }

  return (
    <ActionBarButton
      action={showOverlayFunction}
      icon={faTrash}
      iconClasses={"danger-red"}
      popoverText={`Delete this Tool`}
      className={className}
    />
  );
}

ActionBarDeleteToolButton.propTypes = {
  toolModel: PropTypes.object,
  className: PropTypes.string,
};

export default ActionBarDeleteToolButton;