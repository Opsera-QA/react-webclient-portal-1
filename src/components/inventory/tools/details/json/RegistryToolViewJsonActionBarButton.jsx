import React from "react";
import PropTypes from "prop-types";
import ActionBarViewJsonButtonBase from "components/common/actions/buttons/ActionBarViewJsonButtonBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import ToolJsonOverlay from "components/inventory/tools/details/json/ToolJsonOverlay";

export default function RegistryToolViewJsonActionBarButton(
  {
    toolModel,
    disabled,
    className,
  }) {
  const {
    toastContext,
  } = useComponentStateReference();

  const showJsonFunction = () => {
    toastContext.showOverlayPanel(
      <ToolJsonOverlay
        toolModel={toolModel}
      />
    );
  };

  return (
    <ActionBarViewJsonButtonBase
      showJsonFunction={showJsonFunction}
      disabled={disabled}
      className={className}
    />
  );
}

RegistryToolViewJsonActionBarButton.propTypes = {
  toolModel: PropTypes.object,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};
