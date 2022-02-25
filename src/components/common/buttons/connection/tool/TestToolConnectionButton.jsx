import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faPlug} from "@fortawesome/pro-light-svg-icons";
import {faExclamationTriangle} from "@fortawesome/pro-solid-svg-icons/faExclamationTriangle";
import {AuthContext} from "contexts/AuthContext";
import toolsActions from "components/inventory/tools/tools-actions";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import ToolRegistryConnectionLogOverlay from "components/common/buttons/connection/tool/ToolRegistryConnectionLogOverlay";
import axios from "axios";
import IconBase from "components/common/icons/IconBase";
import {parseError} from "components/common/helpers/error-helpers";

function TestToolConnectionButton({ toolModel, disabled, toolName }) {
  const { getAccessToken } = useContext(AuthContext);
  const [isTesting, setIsTesting] = useState(false);
  const [successfulConnection, setSuccessfulConnection] = useState(false);
  const [failedConnection, setFailedConnection] = useState(false);
  const [showConnectionLog, setShowConnectionLog] = useState(false);
  const [logs, setLogs] = useState(["Starting connection test of tool...\n"]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const testConnection = async () => {
    try {
      setShowConnectionLog(true);
      setIsTesting(true);
      setSuccessfulConnection(false);
      setFailedConnection(false);

      const response = await toolsActions.checkToolConnectivityV2(getAccessToken, cancelTokenSource, toolModel?.getData("_id"), toolName);

      if (response?.status === 200) {
        const message = JSON.stringify(response?.data?.message);
        const status = response?.status;

      setLogs([
        ...logs,
        "Connection Succeeded!\n",
        `Status: ${status}\n`,
        `Message: ${message}\n`,
        `Test Complete.\nPlease close this window to proceed.\n`,
      ]);
        setSuccessfulConnection(true);
      }
      else {
        const message = JSON.stringify(response?.data?.message);
        let status = response?.status;

        setLogs([
          ...logs,
          `Connection Failed!\n`,
          `Status : ${status}\n`,
          `Message: ${message}\n`,
          `Test Complete. \nPlease close this panel, address the issue and try again.\n`,
        ]);

        setFailedConnection(true);
      }
    }
    catch (error) {
      const parsedError = parseError(error);

      setLogs([
        ...logs,
        `Connection Failed!\n`,
        `Error: ${parsedError}\n`,
        `Test Complete.  Please close this panel, address the issue and try again.\n`,
      ]);

      setFailedConnection(true);
    }
    finally {
      if (isMounted.current === true) {
        setIsTesting(false);
      }
    }
  };

  const getVariant = () => {
    if (successfulConnection) {
      return "success";
    }

    if (failedConnection) {
      return "danger";
    }

    return ("secondary");
  };

  const getLabel = () => {
    if (isTesting) {
      return (
        <span>
          <IconBase isLoading={isTesting} className={"mr-2"}/>
          Testing Connection
        </span>
      );
    }

    if (failedConnection) {
      return (
        <span>
          <IconBase icon={faExclamationTriangle} className={"mr-2"}/>
          Connection Failed!
        </span>
      );
    }

    if (successfulConnection) {
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

  const getConnectionLogOverlay = () => {
    if (showConnectionLog === true) {
      return (
        <ToolRegistryConnectionLogOverlay
          isLoading={false}
          handleCloseFunction={() => {
            setShowConnectionLog(false);
          }}
          logs={logs}
        />
      );
    }
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
          size="sm"
          variant={getVariant()}
          disabled={isTesting === true || disabled === true}
          onClick={() => testConnection()}
        >
          {getLabel()}
        </Button>
      </TooltipWrapper>
      {getConnectionLogOverlay()}
    </div>
  );
}

TestToolConnectionButton.propTypes = {
  toolModel: PropTypes.object,
  disabled: PropTypes.bool,
  toolName: PropTypes.string
};

export default TestToolConnectionButton;