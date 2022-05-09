import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import { apigeeRunParametersActions } from "../../apigeeRunParameters.actions";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";

function ApigeeRunParameterEnvironmentMultiSelectInput({ dataObject, setDataObject, disabled, parameters }) {
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
  }, []);

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

    const { toolId } = parameters.getPersistData();

    const response = await apigeeRunParametersActions.getApigeeEnvironments(
      getAccessToken,
      cancelSource,
      toolId
    );

    const result = response?.data?.status === 200 ? response?.data?.message : [];

    if (Array.isArray(result)) {
      setErrorMessage("");
      setEnvironmentsList(result);
      setPlaceholderText("Select Apigee Environment");
    }

    if (result?.length === 0) {
      setPlaceholderText("No Apigee Environments found");
    }
  };

  return (
    <MultiSelectInputBase
      fieldName={"kvmEnvironment"}
      dataObject={dataObject}
      setDataObject={setDataObject}
      placeholderText={placeholderText}
      selectOptions={environmentsList}
      textField={"name"}
      valueField={"name"}
      busy={isLoading}
      disabled={disabled || isLoading || environmentsList == null || environmentsList.length === 0}
    />
  );
}

ApigeeRunParameterEnvironmentMultiSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  parameters: PropTypes.object,
};

ApigeeRunParameterEnvironmentMultiSelectInput.defaultProps = {
  disabled: false,
};

export default ApigeeRunParameterEnvironmentMultiSelectInput;
