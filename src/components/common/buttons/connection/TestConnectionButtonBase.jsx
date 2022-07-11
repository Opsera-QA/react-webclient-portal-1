import React from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faPlug, faSquare, faExclamationTriangle} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import LoadingIcon from "components/common/icons/LoadingIcon";

export const TEST_CONNECTION_STATES = {
  CANCELLED: "canceled",
  FAILED_CONNECTION: "failed_connection",
  READY: "ready",
  SUCCESSFUL_CONNECTION: "successful_connection",
  TESTING: "testing",
};

function TestConnectionButtonBase(
  {
    currentState,
    onClickFunction,
    size,
    disabled,
  }) {
  const getVariant = () => {
    switch (currentState) {
      case TEST_CONNECTION_STATES.SUCCESSFUL_CONNECTION:
        return "success";
      case TEST_CONNECTION_STATES.FAILED_CONNECTION:
        return "danger";
      default:
        return "secondary";
    }
  };

  const getLabel = () => {
    switch (currentState) {
      case TEST_CONNECTION_STATES.TESTING:
        return (
          <span>
            <LoadingIcon className={"mr-2"} />
            Testing Connection
          </span>
        );
      case TEST_CONNECTION_STATES.FAILED_CONNECTION:
        return (
          <span>
            <IconBase icon={faExclamationTriangle} className={"mr-2"} />
            Connection Failed!
          </span>
        );
      case TEST_CONNECTION_STATES.SUCCESSFUL_CONNECTION:
        return (
          <span>
            <IconBase icon={faPlug} className={"mr-2"} />
            Connection Succeeded!
          </span>
        );
      case TEST_CONNECTION_STATES.CANCELLED:
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

  if (onClickFunction == null) {
    return null;
  }

  return (
    <Button
      size={size}
      variant={getVariant()}
      disabled={currentState === TEST_CONNECTION_STATES.TESTING || disabled === true}
      onClick={onClickFunction}
    >
      {getLabel()}
    </Button>
  );
}

TestConnectionButtonBase.propTypes = {
  onClickFunction: PropTypes.func,
  currentState: PropTypes.string,
  size: PropTypes.string,
  disabled: PropTypes.bool,
};

export default TestConnectionButtonBase;