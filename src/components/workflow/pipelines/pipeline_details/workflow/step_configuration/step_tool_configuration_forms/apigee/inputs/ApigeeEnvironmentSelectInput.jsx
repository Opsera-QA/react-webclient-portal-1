import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import apigeeActions from "../apigee-step-actions";

function ApigeeEnvironmentSelectInput({ model, setModel, disabled, toolConfigId }) {
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("Select Apigee Environment");
  const [environmentsList, setEnvironmentsList] = useState([]);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    setErrorMessage("");

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [toolConfigId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      setEnvironmentsList([]);
      await fetchApigeeEnvironments(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        setPlaceholderText("Could not pull Apigee Environments");
        setErrorMessage(`An Error Occurred Pulling Apigee Environments: ${error}`);
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchApigeeEnvironments = async (cancelSource = cancelTokenSource, acrStep, azureTool) => {

    const response = await apigeeActions.getApigeeEnvironments(
      getAccessToken,
      cancelSource,
      toolConfigId
    );

    const result = response?.data?.data;

    if (Array.isArray(result) && result.length > 0) {
      setErrorMessage("");
      setEnvironmentsList(result);
      setPlaceholderText("Select Apigee Environment");
    }

    if (result?.length === 0) {
      setPlaceholderText("No Apigee Environments found");
      setErrorMessage("No Apigee Environments found");
    }
  };

  return (
    <SelectInputBase
      fieldName={"environmentName"}
      dataObject={model}
      setDataObject={setModel}
      placeholderText={placeholderText}
      selectOptions={environmentsList}
      textField={"name"}
      valueField={"name"}
      busy={isLoading}
      disabled={disabled}
    />
  );
}

ApigeeEnvironmentSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  toolConfigId: PropTypes.string,
};

export default ApigeeEnvironmentSelectInput;
