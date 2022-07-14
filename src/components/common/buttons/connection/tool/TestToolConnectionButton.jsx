import React, { useState } from "react";
import PropTypes from "prop-types";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import ToolRegistryConnectionLogOverlay from "components/common/buttons/connection/tool/ToolRegistryConnectionLogOverlay";
import useComponentStateReference from "hooks/useComponentStateReference";
import TestConnectionButtonBase, {
  TEST_CONNECTION_STATES,
} from "components/common/buttons/connection/TestConnectionButtonBase";
import { generateUUID } from "components/common/helpers/string-helpers";

function TestToolConnectionButton({ toolModel, disabled, toolName }) {
  const [currentState, setCurrentState]  = useState(TEST_CONNECTION_STATES.READY);
  const { toastContext } = useComponentStateReference();

  const launchConnectionLogOverlay = () => {
    toastContext.showOverlayPanel(
      <ToolRegistryConnectionLogOverlay
        currentState={currentState}
        setCurrentState={setCurrentState}
        toolModel={toolModel}
        toolName={toolName}
        instanceId={generateUUID()}
      />
    );
  };

  if (toolModel == null) {
    return null;
  }

  return (
    <div className="px-2">
      <TooltipWrapper
        innerText={`This tool must be saved before testing connection.`}
      >
        <TestConnectionButtonBase
          currentState={currentState}
          size={"sm"}
          onClickFunction={launchConnectionLogOverlay}
          disabled={disabled}
        />
      </TooltipWrapper>
    </div>
  );
}

TestToolConnectionButton.propTypes = {
  toolModel: PropTypes.object,
  disabled: PropTypes.bool,
  toolName: PropTypes.string
};

export default TestToolConnectionButton;