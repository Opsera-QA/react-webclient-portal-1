import React, {useContext, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faPlug} from "@fortawesome/pro-light-svg-icons";
import {faExclamationTriangle} from "@fortawesome/pro-solid-svg-icons/faExclamationTriangle";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import ToolRegistryConnectionLogOverlay from "components/common/buttons/connection/tool/ToolRegistryConnectionLogOverlay";
import IconBase from "components/common/icons/IconBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import LoadingIcon from "components/common/icons/LoadingIcon";

export const TEST_TOOL_CONNECTION_STATES = {
  FAILED_CONNECTION: "failed_connection",
  READY: "ready",
  SUCCESSFUL_CONNECTION: "successful_connection",
  TESTING: "testing",
};

function TestToolConnectionButton({ toolModel, disabled, toolName }) {
  const [currentState, setCurrentState]  = useState(TEST_TOOL_CONNECTION_STATES.READY);
  const { toastContext } = useComponentStateReference();

  const getVariant = () => {
    switch (currentState) {
      case TEST_TOOL_CONNECTION_STATES.SUCCESSFUL_CONNECTION:
        return "success";
      case TEST_TOOL_CONNECTION_STATES.FAILED_CONNECTION:
        return "danger";
      default:
        return "secondary";
    }
  };

  const getLabel = () => {
    if (currentState === TEST_TOOL_CONNECTION_STATES.TESTING) {
      return (
        <span>
          <LoadingIcon className={"mr-2"}/>
          Testing Connection
        </span>
      );
    }

    if (currentState === TEST_TOOL_CONNECTION_STATES.FAILED_CONNECTION) {
      return (
        <span>
          <IconBase icon={faExclamationTriangle} className={"mr-2"}/>
          Connection Failed!
        </span>
      );
    }

    if (currentState === TEST_TOOL_CONNECTION_STATES.SUCCESSFUL_CONNECTION) {
      return (
        <span>
          <IconBase icon={faPlug} className={"mr-2"} />
          Connection Succeeded!
        </span>
      );
    }

    return (
      <span>
        <IconBase icon={faPlug} className={"mr-2"}/>
        Test Connection
      </span>
    );
  };

  const launchConnectionLogOverlay = () => {
    setCurrentState(TEST_TOOL_CONNECTION_STATES.TESTING);
    toastContext.showOverlayPanel(
      <ToolRegistryConnectionLogOverlay
        currentState={currentState}
        toolModel={toolModel}
        setCurrentState={setCurrentState}
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
          disabled={currentState === TEST_TOOL_CONNECTION_STATES.TESTING || disabled === true}
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