import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faPlug} from "@fortawesome/pro-light-svg-icons";
import {faExclamationTriangle} from "@fortawesome/pro-solid-svg-icons/faExclamationTriangle";
import {AuthContext} from "contexts/AuthContext";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import axios from "axios";
import IconBase from "components/common/icons/IconBase";
import {parseError} from "components/common/helpers/error-helpers";
import externalApiIntegratorEndpointsActions
  from "components/inventory/tools/details/identifiers/external_api_integrator/endpoints/externalApiIntegratorEndpoints.actions";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";

function ValidateEndpointButton(
  {
    setLogs,
    toolId,
    endpointId,
    disabled,
  }) {
  const { getAccessToken } = useContext(AuthContext);
  const [isTesting, setIsTesting] = useState(false);
  const [successfulConnection, setSuccessfulConnection] = useState(false);
  const [failedConnection, setFailedConnection] = useState(false);
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
    const newLogs = ["Starting endpoint validation test...\n"];

    try {
      setLogs(newLogs);
      setIsTesting(true);
      setSuccessfulConnection(false);
      setFailedConnection(false);
      const response = await externalApiIntegratorEndpointsActions.testConnectionValidationEndpoint(
        getAccessToken,
        cancelTokenSource,
        toolId,
        endpointId,
      );

      const success = response?.data?.successful;
      const message = JSON.stringify(response?.data?.data);

      if (success === true) {
        setLogs([
          ...newLogs,
          "Endpoint Validation Succeeded!\n",
          `Message: ${message}\n`,
          `Test Complete.\nPlease close this window to proceed.\n`,
        ]);

        setSuccessfulConnection(true);
      }
      else {
        setLogs([
          ...newLogs,
          `Endpoint Validation Failed!\n`,
          `Message: ${message}\n`,
          `Test Complete. \nPlease close this panel, address the issue and try again.\n`,
        ]);

        setFailedConnection(true);
      }
    }
    catch (error) {
      const parsedError = parseError(error);

      setLogs([
        ...newLogs,
        `Endpoint Validation Failed!\n`,
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
          Validating Endpoint
        </span>
      );
    }

    if (failedConnection) {
      return (
        <span>
          <IconBase icon={faExclamationTriangle} className={"mr-2"}/>
          Endpoint Validation Failed!
        </span>
      );
    }

    if (successfulConnection) {
      return (
        <span>
          <IconBase icon={faPlug} className={"mr-2"} />
          Endpoint Validation Succeeded!
        </span>
      );
    }

    return (
      <span>
        <IconBase icon={faPlug} className={"mr-2"}/>
        Validate Endpoint
      </span>
    );
  };

  return (
    <TooltipWrapper
      innerText={`This Endpoint must be saved before testing it.`}
    >
      <Button
        variant={getVariant()}
        // TODO: Do harder check on url
        disabled={
          isTesting === true
          || disabled === true
          || isMongoDbId(endpointId) !== true
          || isMongoDbId(toolId) !== true
        }
        onClick={() => testConnection()}
      >
        {getLabel()}
      </Button>
    </TooltipWrapper>
  );
}

ValidateEndpointButton.propTypes = {
  toolId: PropTypes.string,
  endpointId: PropTypes.string,
  disabled: PropTypes.bool,
  setLogs: PropTypes.func,
};

export default ValidateEndpointButton;