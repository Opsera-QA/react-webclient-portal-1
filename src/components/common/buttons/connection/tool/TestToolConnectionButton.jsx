import React, {useRef} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faPlug, faSquare, faExclamationTriangle} from "@fortawesome/pro-light-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import ToolRegistryConnectionLogOverlay from "components/common/buttons/connection/tool/ToolRegistryConnectionLogOverlay";
import IconBase from "components/common/icons/IconBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import LoadingIcon from "components/common/icons/LoadingIcon";

export const TEST_TOOL_CONNECTION_STATES = {
  CANCELLED: "canceled",
  FAILED_CONNECTION: "failed_connection",
  READY: "ready",
  SUCCESSFUL_CONNECTION: "successful_connection",
  TESTING: "testing",
};

function TestToolConnectionButton({ toolModel, disabled, toolName }) {
  const currentStateRef  = useRef(TEST_TOOL_CONNECTION_STATES.READY);
  const { toastContext } = useComponentStateReference();

  const getVariant = () => {
    switch (currentStateRef?.current) {
      case TEST_TOOL_CONNECTION_STATES.SUCCESSFUL_CONNECTION:
        return "success";
      case TEST_TOOL_CONNECTION_STATES.FAILED_CONNECTION:
        return "danger";
      default:
        return "secondary";
    }
  };

  const getLabel = () => {
    switch (currentStateRef?.current) {
      case TEST_TOOL_CONNECTION_STATES.TESTING:
        return (
          <span>
            <LoadingIcon className={"mr-2"} />
            Testing Connection
          </span>
        );
      case TEST_TOOL_CONNECTION_STATES.FAILED_CONNECTION:
        return (
          <span>
            <IconBase icon={faExclamationTriangle} className={"mr-2"} />
            Connection Failed!
          </span>
        );
      case TEST_TOOL_CONNECTION_STATES.SUCCESSFUL_CONNECTION:
        return (
          <span>
            <IconBase icon={faPlug} className={"mr-2"} />
            Connection Succeeded!
          </span>
        );
      case TEST_TOOL_CONNECTION_STATES.CANCELLED:
        return (
          <span>
            <IconBase icon={faSquare} className={"mr-2"} />
            Connection Test Canceled!
          </span>
        );
      default:
        return (
          <span>
            <IconBase icon={faPlug} className={"mr-2"} />
            Test Connection
          </span>
        );
    }
  };

  const launchConnectionLogOverlay = () => {
    currentStateRef.current = TEST_TOOL_CONNECTION_STATES.TESTING;
    toastContext.showOverlayPanel(
      <ToolRegistryConnectionLogOverlay
        currentStateRef={currentStateRef}
        toolModel={toolModel}
        toolName={toolName}
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
        <Button
          size={"sm"}
          variant={getVariant()}
          disabled={currentStateRef?.current === TEST_TOOL_CONNECTION_STATES.TESTING || disabled === true}
          onClick={launchConnectionLogOverlay}
        >
          {getLabel()}
        </Button>
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